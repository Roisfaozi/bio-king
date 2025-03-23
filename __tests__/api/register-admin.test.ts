import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/user/register-admin/route';
import db from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';

// Mock dependencies
jest.mock('@/lib/db', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('@/lib/auth', () => ({
  getAuthSession: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(() => Promise.resolve('hashed_password')),
}));

describe('POST /api/user/register-admin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockValidData = {
    name: 'Admin Test',
    email: 'admin@example.com',
    password: 'Admin123@!',
    token: 'admin-secret-token-2024',
  };

  it('should create admin with valid token', async () => {
    // Mock session as non-admin
    (getAuthSession as jest.Mock).mockResolvedValue({
      user: {
        role: 'USER',
      },
    });

    // No existing user found
    (db.user.findUnique as jest.Mock).mockResolvedValue(null);

    // Mock user creation
    (db.user.create as jest.Mock).mockResolvedValue({
      id: '123',
      name: 'Admin Test',
      email: 'admin@example.com',
      role: 'ADMIN',
      created_at: new Date(),
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: mockValidData,
    });

    const response = await POST(req);
    const responseData = await response.json();

    expect(response.status).toBe(201);
    expect(responseData.status).toBe(201);
    expect(responseData.message).toBe('Akun admin berhasil dibuat');
    expect(responseData.data).toBeDefined();
    expect(responseData.data.role).toBe('ADMIN');
    expect(db.user.create).toHaveBeenCalledWith({
      data: {
        name: mockValidData.name,
        email: mockValidData.email,
        password: 'hashed_password',
        role: 'ADMIN',
      },
      select: expect.any(Object),
    });
  });

  it('should create admin when requester is already an admin (no token needed)', async () => {
    // Mock session as admin
    (getAuthSession as jest.Mock).mockResolvedValue({
      user: {
        role: 'ADMIN',
      },
    });

    // No existing user
    (db.user.findUnique as jest.Mock).mockResolvedValue(null);

    // Mock user creation
    (db.user.create as jest.Mock).mockResolvedValue({
      id: '123',
      name: 'Admin Test',
      email: 'admin@example.com',
      role: 'ADMIN',
      created_at: new Date(),
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: mockValidData.name,
        email: mockValidData.email,
        password: mockValidData.password,
        // No token provided as requester is admin
      },
    });

    const response = await POST(req);
    const responseData = await response.json();

    expect(response.status).toBe(201);
    expect(bcrypt.hash).toHaveBeenCalledWith(mockValidData.password, 10);
    expect(db.user.create).toHaveBeenCalled();
  });

  it('should reject when email already exists', async () => {
    // Mock existing user
    (db.user.findUnique as jest.Mock).mockResolvedValue({
      id: '123',
      email: mockValidData.email,
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: mockValidData,
    });

    const response = await POST(req);
    const responseData = await response.json();

    expect(response.status).toBe(400);
    expect(responseData.status).toBe(400);
    expect(responseData.message).toBe('Email sudah terdaftar');
    expect(db.user.create).not.toHaveBeenCalled();
  });

  it('should reject when invalid token provided', async () => {
    // Mock session as non-admin
    (getAuthSession as jest.Mock).mockResolvedValue({
      user: {
        role: 'USER',
      },
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        ...mockValidData,
        token: 'wrong-token',
      },
    });

    const response = await POST(req);
    const responseData = await response.json();

    expect(response.status).toBe(403);
    expect(responseData.status).toBe(403);
    expect(responseData.message).toBe('Token admin tidak valid');
    expect(db.user.create).not.toHaveBeenCalled();
  });

  it('should reject when no token provided and not admin', async () => {
    // Mock session as non-admin
    (getAuthSession as jest.Mock).mockResolvedValue({
      user: {
        role: 'USER',
      },
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: mockValidData.name,
        email: mockValidData.email,
        password: mockValidData.password,
        // No token provided
      },
    });

    const response = await POST(req);
    const responseData = await response.json();

    expect(response.status).toBe(403);
    expect(db.user.create).not.toHaveBeenCalled();
  });

  it('should handle validation errors properly', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'A', // Too short
        email: 'not-an-email',
        password: 'weak',
      },
    });

    const response = await POST(req);
    expect(response.status).toBe(500); // Validation errors caught in catch block
    expect(db.user.create).not.toHaveBeenCalled();
  });
});
