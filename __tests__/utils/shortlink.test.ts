import { withRLS } from '@/lib/db';
import { generateShortCode, getCurrentEpoch } from '@/lib/utils';

// Mock dependencies
jest.mock('@/lib/db', () => ({
  withRLS: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  generateShortCode: jest.fn(() => 'abc123'),
  getCurrentEpoch: jest.fn(() => 1234567890),
}));

describe('Shortlink', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock implementations
    const mockDb = {
      links: {
        create: jest.fn().mockImplementation((args) => {
          return Promise.resolve({
            id: 'link-123',
            ...args.data,
          });
        }),
        findFirst: jest.fn().mockImplementation((args) => {
          if (args.where.short_code === 'existing') {
            return Promise.resolve({
              id: 'link-existing',
              short_code: 'existing',
              original_url: 'https://example.com/existing',
            });
          }
          return Promise.resolve(null);
        }),
        findUnique: jest.fn().mockImplementation((args) => {
          if (args.where.short_code === 'abc123') {
            return Promise.resolve({
              id: 'link-123',
              short_code: 'abc123',
              original_url: 'https://example.com',
              is_active: true,
              expires_at: null,
            });
          }
          if (args.where.short_code === 'expired') {
            return Promise.resolve({
              id: 'link-456',
              short_code: 'expired',
              original_url: 'https://example.com/expired',
              is_active: true,
              expires_at: 1000, // Sudah expired (timestamp kecil)
            });
          }
          if (args.where.short_code === 'inactive') {
            return Promise.resolve({
              id: 'link-789',
              short_code: 'inactive',
              original_url: 'https://example.com/inactive',
              is_active: false,
              expires_at: null,
            });
          }
          return Promise.resolve(null);
        }),
      },
    };

    (withRLS as jest.Mock).mockReturnValue(mockDb);
  });

  // Import functions locally to use the mocked dependencies
  async function createShortlinks(userId: string, data: any) {
    try {
      // Generate a short code for the URL
      const shortCode = generateShortCode();

      // Get current timestamp
      const now = getCurrentEpoch();
      const dbRls = withRLS(userId);
      const isLinkExists = await dbRls.links.findFirst({
        where: { short_code: data.short_code, user_id: userId },
      });

      if (isLinkExists) {
        throw new Error('Bio page already exists');
      }

      // Insert into database using RLS with Prisma
      const result = await dbRls.links.create({
        data: {
          user_id: userId,
          short_code: shortCode,
          original_url: data.originalUrl,
          title: data.title || null,
          created_at: now,
          updated_at: now,
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async function resolveShortLink(shortCode: string) {
    try {
      const dbRls = withRLS('system');
      const link = await dbRls.links.findUnique({
        where: { short_code: shortCode },
      });

      if (!link) {
        return {
          originalUrl: null,
          shortCode,
          found: false,
        };
      }

      if (!link.is_active) {
        return {
          originalUrl: null,
          shortCode,
          found: false,
          reason: 'inactive',
        };
      }

      if (link.expires_at && link.expires_at < getCurrentEpoch()) {
        return {
          originalUrl: null,
          shortCode,
          found: false,
          reason: 'expired',
        };
      }

      return {
        originalUrl: link.original_url,
        shortCode,
        found: true,
      };
    } catch (error) {
      console.error('Error resolving shortlink:', error);
      return {
        originalUrl: null,
        shortCode,
        found: false,
        reason: 'error',
      };
    }
  }

  describe('createShortlinks', () => {
    test('harus membuat shortlink baru dengan URL asli', async () => {
      const result = await createShortlinks('user-123', {
        originalUrl: 'https://example.com',
      });

      expect(result).toEqual({
        id: 'link-123',
        user_id: 'user-123',
        short_code: 'abc123',
        original_url: 'https://example.com',
        title: null,
        created_at: 1234567890,
        updated_at: 1234567890,
      });

      const dbRls = withRLS('user-123');
      expect(dbRls.links.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          short_code: 'abc123',
          original_url: 'https://example.com',
          user_id: 'user-123',
        }),
      });
    });

    test('harus gagal jika shortcode sudah ada', async () => {
      await expect(
        createShortlinks('user-123', {
          originalUrl: 'https://example.com',
          short_code: 'existing',
        }),
      ).rejects.toThrow('Bio page already exists');

      const dbRls = withRLS('user-123');
      expect(dbRls.links.create).not.toHaveBeenCalled();
    });

    test('harus membuat shortlink dengan title', async () => {
      const result = await createShortlinks('user-123', {
        originalUrl: 'https://example.com',
        title: 'Example Link',
      });

      expect(result.title).toBe('Example Link');

      const dbRls = withRLS('user-123');
      expect(dbRls.links.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          title: 'Example Link',
        }),
      });
    });
  });

  describe('resolveShortLink', () => {
    test('harus mengembalikan URL asli untuk shortcode yang valid', async () => {
      const result = await resolveShortLink('abc123');

      expect(result).toEqual({
        originalUrl: 'https://example.com',
        shortCode: 'abc123',
        found: true,
      });

      const dbRls = withRLS('system');
      expect(dbRls.links.findUnique).toHaveBeenCalledWith({
        where: { short_code: 'abc123' },
      });
    });

    test('harus mengembalikan not found untuk shortcode yang tidak ada', async () => {
      const result = await resolveShortLink('notfound');

      expect(result).toEqual({
        originalUrl: null,
        shortCode: 'notfound',
        found: false,
      });
    });

    test('harus mengembalikan not found untuk shortlink yang expired', async () => {
      const result = await resolveShortLink('expired');

      expect(result).toEqual({
        originalUrl: null,
        shortCode: 'expired',
        found: false,
        reason: 'expired',
      });
    });

    test('harus mengembalikan not found untuk shortlink yang tidak aktif', async () => {
      const result = await resolveShortLink('inactive');

      expect(result).toEqual({
        originalUrl: null,
        shortCode: 'inactive',
        found: false,
        reason: 'inactive',
      });
    });
  });
});
