import { addAdmin } from '@/action/auth-action';
import { registerAdmin } from '@/config/user.config';

// Mock dependencies
jest.mock('@/config/user.config', () => ({
  registerAdmin: jest.fn(),
}));

describe('Admin Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addAdmin', () => {
    it('should call registerAdmin with correct data', async () => {
      const mockAdminData = {
        name: 'Admin Test',
        email: 'admin@example.com',
        password: 'Admin123@!',
        token: 'admin-secret-token-2024',
      };

      const mockResponse = {
        status: 201,
        message: 'Akun admin berhasil dibuat',
        data: {
          id: '123',
          name: 'Admin Test',
          email: 'admin@example.com',
          role: 'ADMIN',
        },
      };

      (registerAdmin as jest.Mock).mockResolvedValue(mockResponse);

      const result = await addAdmin(mockAdminData);

      expect(registerAdmin).toHaveBeenCalledWith(mockAdminData);
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors from registerAdmin', async () => {
      const mockAdminData = {
        name: 'Admin Test',
        email: 'admin@example.com',
        password: 'Admin123@!',
      };

      const mockError = {
        status: 400,
        message: 'Email sudah terdaftar',
      };

      (registerAdmin as jest.Mock).mockResolvedValue(mockError);

      const result = await addAdmin(mockAdminData);

      expect(registerAdmin).toHaveBeenCalledWith(mockAdminData);
      expect(result).toEqual(mockError);
    });

    it('should pass token when provided', async () => {
      const mockAdminData = {
        name: 'Admin Test',
        email: 'admin@example.com',
        password: 'Admin123@!',
        token: 'custom-token',
      };

      (registerAdmin as jest.Mock).mockResolvedValue({
        status: 201,
        message: 'Akun admin berhasil dibuat',
      });

      await addAdmin(mockAdminData);

      expect(registerAdmin).toHaveBeenCalledWith(
        expect.objectContaining({
          token: 'custom-token',
        }),
      );
    });

    it('should work without token', async () => {
      const mockAdminData = {
        name: 'Admin Test',
        email: 'admin@example.com',
        password: 'Admin123@!',
        // No token
      };

      (registerAdmin as jest.Mock).mockResolvedValue({
        status: 201,
        message: 'Akun admin berhasil dibuat',
      });

      await addAdmin(mockAdminData);

      expect(registerAdmin).toHaveBeenCalledWith(mockAdminData);
    });
  });
});
