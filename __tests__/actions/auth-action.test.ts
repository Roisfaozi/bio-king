import { addAdmin } from '@/action/auth-action';
import { registerAdmin } from '@/config/user.config';

// Mock dependencies
jest.mock('@/config/user.config', () => ({
  registerAdmin: jest.fn(),
}));

describe('addAdmin function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call registerAdmin with provided data', async () => {
    const mockData = {
      name: 'Admin Test',
      email: 'admin@test.com',
      password: 'SecurePass123!',
      token: 'admin-token',
    };

    // Mock successful response
    (registerAdmin as jest.Mock).mockResolvedValue({
      success: true,
      message: 'Admin registered successfully',
    });

    const result = await addAdmin(mockData);

    expect(registerAdmin).toHaveBeenCalledWith(mockData);
    expect(result).toEqual({
      success: true,
      message: 'Admin registered successfully',
    });
  });

  it('should handle error from registerAdmin', async () => {
    const mockData = {
      name: 'Admin Test',
      email: 'admin@test.com',
      password: 'SecurePass123!',
      token: 'admin-token',
    };

    // Mock error response
    const errorMessage = 'Email already registered';
    (registerAdmin as jest.Mock).mockResolvedValue({
      success: false,
      message: errorMessage,
    });

    const result = await addAdmin(mockData);

    expect(registerAdmin).toHaveBeenCalledWith(mockData);
    expect(result).toEqual({
      success: false,
      message: errorMessage,
    });
  });

  it('should work with token field', async () => {
    const mockData = {
      name: 'Admin Test',
      email: 'admin@test.com',
      password: 'SecurePass123!',
      token: 'custom-admin-token',
    };

    (registerAdmin as jest.Mock).mockResolvedValue({
      success: true,
      message: 'Admin registered successfully',
    });

    await addAdmin(mockData);

    expect(registerAdmin).toHaveBeenCalledWith(mockData);
  });

  it('should work without token field', async () => {
    const mockData = {
      name: 'Admin Test',
      email: 'admin@test.com',
      password: 'SecurePass123!',
    };

    (registerAdmin as jest.Mock).mockResolvedValue({
      success: true,
      message: 'Admin registered successfully',
    });

    await addAdmin(mockData);

    expect(registerAdmin).toHaveBeenCalledWith(mockData);
  });
});
