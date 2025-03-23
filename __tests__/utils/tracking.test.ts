import { trackPageView } from '@/lib/tracking';
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
  isValidUrl: jest.fn((url) => url.startsWith('http')),
}));

jest.mock('next/headers', () => ({
  headers: jest.fn(() => ({
    get: jest.fn((key: string) => {
      const headerMap: Record<string, string> = {
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
        referer: 'https://google.com',
        'x-forwarded-for': '192.168.1.1',
        'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'x-next-pathname': '/test-path',
      };
      return headerMap[key] || null;
    }),
  })),
}));

describe('trackPageView', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock implementations
    const mockDb = {
      bioPages: {
        findFirst: jest.fn().mockResolvedValue({ id: 'bio-page-id' }),
      },
      links: {
        findUnique: jest.fn().mockResolvedValue({ id: 'link-id' }),
      },
      clicks: {
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 'click-id' }),
      },
    };

    (bypassRLS as jest.Mock).mockResolvedValue(mockDb);
    (getGeo as jest.Mock).mockResolvedValue({
      city: 'Jakarta',
      country: 'Indonesia',
    });
  });

  test('should track bio page views', async () => {
    const noRLS = await bypassRLS();

    await trackPageView({
      pageType: 'bio',
      username: 'testuser',
    });

    expect(noRLS.bioPages.findFirst).toHaveBeenCalledWith({
      where: {
        username: 'testuser',
        visibility: 'public',
        archived_at: null,
      },
      select: { id: true },
    });

    expect(noRLS.clicks.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        bio_page_id: 'bio-page-id',
        is_unique: true,
        source_type: 'bio_page',
        ip: '192.168.1.1',
        browser: 'Chrome',
        os: 'Windows',
        device: 'Desktop',
      }),
    });
  });

  test('should track shortlink clicks', async () => {
    const noRLS = await bypassRLS();

    await trackPageView({
      pageType: 'link',
      shortCode: 'abc123',
    });

    expect(noRLS.links.findUnique).toHaveBeenCalledWith({
      where: { short_code: 'abc123' },
      select: { id: true },
    });

    expect(noRLS.clicks.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        link_id: 'link-id',
        is_unique: true,
        source_type: 'shortlink',
      }),
    });
  });

  test('should track tinder page with geolocation', async () => {
    const noRLS = await bypassRLS();
    const geoData = {
      latitude: 12.3456,
      longitude: 78.9012,
      accuracy: 10,
      timestamp: 1234567890,
    };

    await trackPageView({
      pageType: 'tinder',
      pageId: 'mobile',
      geoData,
    });

    expect(noRLS.clicks.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        latitude: 12.3456,
        longitude: 78.9012,
        accuracy: 10,
        platform: 'tinder',
        screen_size: 'mobile',
        is_unique: true,
        source_type: 'tinder_page',
      }),
    });
  });

  test('should track other page types', async () => {
    const noRLS = await bypassRLS();

    await trackPageView({
      pageType: 'feature',
      pageId: 'tracking-feature',
    });

    expect(noRLS.clicks.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        platform: 'feature',
        screen_size: 'tracking-feature',
        is_unique: true,
        source_type: 'feature_page',
      }),
    });
  });
});
