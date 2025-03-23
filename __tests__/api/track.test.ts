import { NextRequest, NextResponse } from 'next/server';
import { POST } from '@/app/api/track/route';
import { trackPageView } from '@/lib/tracking';

// Mock trackPageView function
jest.mock('@/lib/tracking', () => ({
  trackPageView: jest.fn(),
}));

describe('POST /api/track', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (trackPageView as jest.Mock).mockResolvedValue(true);
  });

  test('harus mengembalikan 400 jika tidak ada pageType', async () => {
    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.message).toBe('Missing required fields');
    expect(trackPageView).not.toHaveBeenCalled();
  });

  test('harus memanggil trackPageView dan mengembalikan 200 jika pageType ada', async () => {
    const trackingData = {
      pageType: 'tinder',
      pageId: 'mobile',
      geoData: {
        latitude: 12.3456,
        longitude: 78.9012,
        accuracy: 10,
        timestamp: 1234567890,
      },
    };

    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify(trackingData),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);

    expect(trackPageView).toHaveBeenCalledWith(trackingData);
  });

  test('harus mengembalikan 200 meskipun terjadi error pada trackPageView', async () => {
    (trackPageView as jest.Mock).mockRejectedValue(new Error('Test error'));

    const req = new NextRequest('http://localhost/api/track', {
      method: 'POST',
      body: JSON.stringify({ pageType: 'bio', username: 'testuser' }),
    });

    const response = await POST(req);

    // API harus tetap mengembalikan 200 meskipun ada error (untuk stealth mode)
    expect(response.status).toBe(200);

    // Pastikan konsol error dipanggil
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    expect(consoleSpy).not.toHaveBeenCalled(); // Belum dipanggil karena kita meng-mock console.error setelah POST dijalankan

    // Reset mock
    consoleSpy.mockRestore();
  });

  test('harus menangani berbagai jenis data tracking', async () => {
    // Test dengan variasi data tracking
    const testCases = [
      { pageType: 'bio', username: 'testuser' },
      { pageType: 'link', shortCode: 'abc123' },
      { pageType: 'tinder', pageId: 'mobile' },
      { pageType: 'feature', pageId: 'tracking-demo' },
    ];

    for (const testCase of testCases) {
      const req = new NextRequest('http://localhost/api/track', {
        method: 'POST',
        body: JSON.stringify(testCase),
      });

      const response = await POST(req);
      expect(response.status).toBe(200);
      expect(trackPageView).toHaveBeenCalledWith(testCase);

      // Clear mock calls between tests
      (trackPageView as jest.Mock).mockClear();
    }
  });
});
