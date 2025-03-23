import { createAdminSchema } from '@/validation/auth-validation';

describe('Admin Validation Schema', () => {
  describe('createAdminSchema', () => {
    test('valid data should pass validation', () => {
      const validData = {
        name: 'Admin Test',
        email: 'admin@example.com',
        password: 'Admin123@!',
        token: 'admin-secret-token-2024',
      };

      const result = createAdminSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    test('should pass validation without token (optional)', () => {
      const validDataWithoutToken = {
        name: 'Admin Test',
        email: 'admin@example.com',
        password: 'Admin123@!',
      };

      const result = createAdminSchema.safeParse(validDataWithoutToken);
      expect(result.success).toBe(true);
    });

    test('should fail validation with short name', () => {
      const invalidData = {
        name: 'Ad',
        email: 'admin@example.com',
        password: 'Admin123@!',
      };

      const result = createAdminSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('name');
      }
    });

    test('should fail validation with invalid email', () => {
      const invalidData = {
        name: 'Admin Test',
        email: 'admin-at-example.com',
        password: 'Admin123@!',
      };

      const result = createAdminSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('email');
      }
    });

    test('should fail validation with weak password (too short)', () => {
      const invalidData = {
        name: 'Admin Test',
        email: 'admin@example.com',
        password: 'Admin1@',
      };

      const result = createAdminSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('password');
      }
    });

    test('should fail validation with password missing special characters', () => {
      const invalidData = {
        name: 'Admin Test',
        email: 'admin@example.com',
        password: 'Admin12345',
      };

      const result = createAdminSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('password');
      }
    });

    test('should fail validation with password missing uppercase', () => {
      const invalidData = {
        name: 'Admin Test',
        email: 'admin@example.com',
        password: 'admin123@!',
      };

      const result = createAdminSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('password');
      }
    });

    test('should fail validation with password missing lowercase', () => {
      const invalidData = {
        name: 'Admin Test',
        email: 'admin@example.com',
        password: 'ADMIN123@!',
      };

      const result = createAdminSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('password');
      }
    });

    test('should fail validation with password missing numbers', () => {
      const invalidData = {
        name: 'Admin Test',
        email: 'admin@example.com',
        password: 'AdminTest@!',
      };

      const result = createAdminSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('password');
      }
    });
  });
});
