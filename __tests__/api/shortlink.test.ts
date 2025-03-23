import { GET, POST } from '@/app/api/shortlink/route';
import { getAuthSession } from '@/lib/auth';
import { withRLS } from '@/lib/db';
import { generateShortCode } from '@/lib/utils';
import { NextRequest } from 'next/server';
import { createMocks } from 'node-mocks-http';

// Mock dependencies
jest.mock('@/lib/auth', () => ({
  getAuthSession: jest.fn(),
}));

jest.mock('@/lib/db', () => ({
  withRLS: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  generateShortCode: jest.fn(),
  getCurrentEpoch: jest.fn().mockReturnValue(1616168121000),
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('API Shortlink', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/shortlink', () => {
    it('harus mengembalikan 401 jika tidak ada session user', async () => {
      (getAuthSession as jest.Mock).mockResolvedValue(null);

      const { req } = createMocks({
        method: 'POST',
      });

      const response = await POST(req as unknown as NextRequest);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData).toEqual({ message: 'Unauthorized' });
    });

    it('harus membuat shortlink baru dengan data yang valid', async () => {
      const userId = 'user-123';
      const mockShortCode = 'abc123';
      const mockCreatedLink = {
        id: 'link-123',
        short_code: mockShortCode,
        original_url: 'https://example.com',
        title: 'Test Link',
        user_id: userId,
        created_at: 1616168121000,
        updated_at: 1616168121000,
      };

      (getAuthSession as jest.Mock).mockResolvedValue({
        user: { id: userId },
      });
      (generateShortCode as jest.Mock).mockReturnValue(mockShortCode);

      const mockPrismaCreate = jest.fn().mockResolvedValue(mockCreatedLink);
      const mockPrismaFindFirst = jest.fn().mockResolvedValue(null);
      (withRLS as jest.Mock).mockReturnValue({
        links: {
          create: mockPrismaCreate,
          findFirst: mockPrismaFindFirst,
        },
      });

      const { req } = createMocks({
        method: 'POST',
        body: {
          original_url: 'https://example.com',
          title: 'Test Link',
        },
      });

      // Mocking the req.json() method
      const reqAsNextRequest = {
        ...req,
        json: jest.fn().mockResolvedValue({
          original_url: 'https://example.com',
          title: 'Test Link',
        }),
      } as unknown as NextRequest;

      const response = await POST(reqAsNextRequest);
      const responseData = await response.json();

      expect(response.status).toBe(201);
      expect(responseData).toEqual({
        status: 'success',
        data: mockCreatedLink,
      });
      expect(mockPrismaCreate).toHaveBeenCalledWith({
        data: {
          user_id: userId,
          short_code: mockShortCode,
          original_url: 'https://example.com',
          title: 'Test Link',
          is_active: true,
          type: 'shortlink',
          status: 'active',
          visibility: 'public',
          created_at: 1616168121000,
          updated_at: 1616168121000,
        },
      });
    });

    it('harus mengembalikan 400 jika shortcode sudah ada', async () => {
      const userId = 'user-123';
      const mockShortCode = 'abc123';
      const mockExistingLink = {
        id: 'link-123',
        short_code: mockShortCode,
        original_url: 'https://example.com',
        user_id: userId,
      };

      (getAuthSession as jest.Mock).mockResolvedValue({
        user: { id: userId },
      });
      (generateShortCode as jest.Mock).mockReturnValue(mockShortCode);

      const mockPrismaFindFirst = jest.fn().mockResolvedValue(mockExistingLink);
      (withRLS as jest.Mock).mockReturnValue({
        links: {
          findFirst: mockPrismaFindFirst,
        },
      });

      const { req } = createMocks({
        method: 'POST',
        body: {
          original_url: 'https://example.com',
          title: 'Test Link',
        },
      });

      // Mocking the req.json() method
      const reqAsNextRequest = {
        ...req,
        json: jest.fn().mockResolvedValue({
          original_url: 'https://example.com',
          title: 'Test Link',
        }),
      } as unknown as NextRequest;

      const response = await POST(reqAsNextRequest);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData).toEqual({
        status: 'fail',
        message: 'shortcode page already exists',
        data: { short_code: mockShortCode },
      });
    });
  });

  describe('GET /api/shortlink', () => {
    it('harus mengembalikan 401 jika tidak ada session user', async () => {
      (getAuthSession as jest.Mock).mockResolvedValue(null);

      const { req } = createMocks({
        method: 'GET',
      });

      const response = await GET(req as unknown as NextRequest);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData).toEqual({ message: 'Unauthorized' });
    });

    it('harus mengambil daftar shortlink pengguna', async () => {
      const userId = 'user-123';
      const mockLinks = [
        {
          id: 'link-123',
          short_code: 'abc123',
          original_url: 'https://example.com',
          title: 'Test Link 1',
          user_id: userId,
          created_at: 1616168121000,
        },
        {
          id: 'link-456',
          short_code: 'def456',
          original_url: 'https://example.org',
          title: 'Test Link 2',
          user_id: userId,
          created_at: 1616168121000,
        },
      ];

      (getAuthSession as jest.Mock).mockResolvedValue({
        user: { id: userId },
      });

      const mockPrismaFindMany = jest.fn().mockResolvedValue(mockLinks);
      (withRLS as jest.Mock).mockReturnValue({
        links: {
          findMany: mockPrismaFindMany,
        },
      });

      const { req } = createMocks({
        method: 'GET',
      });

      // Mocking the NextRequest with searchParams
      const reqAsNextRequest = {
        ...req,
        nextUrl: {
          searchParams: new URLSearchParams('limit=10'),
        },
      } as unknown as NextRequest;

      const response = await GET(reqAsNextRequest);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData).toEqual({
        status: 'success',
        data: mockLinks,
      });
      expect(mockPrismaFindMany).toHaveBeenCalledWith({
        where: {
          user_id: userId,
        },
        take: 10,
        orderBy: {
          created_at: 'desc',
        },
        include: {
          _count: {
            select: {
              clicks: true,
            },
          },
        },
      });
    });
  });
});
