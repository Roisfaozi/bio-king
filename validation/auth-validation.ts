import { TypeOf, object, string } from 'zod';

export const createUserSchema = object({
  name: string({ required_error: 'Name is required' }).min(
    3,
    'Name must be at least 3 characters.',
  ),
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Your email is invalid.'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string({
    required_error: 'Please confirm your password',
  }).min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export const createAdminSchema = object({
  name: string({ required_error: 'Nama wajib diisi' }).min(
    3,
    'Nama minimal 3 karakter',
  ),
  email: string({ required_error: 'Email wajib diisi' })
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  password: string({ required_error: 'Password wajib diisi' })
    .min(1, 'Password wajib diisi')
    .min(10, 'Password harus minimal 10 karakter')
    .max(64, 'Password maksimal 64 karakter')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password harus mengandung huruf besar, huruf kecil, angka, dan karakter khusus',
    ),
  token: string().optional(),
});

export const loginUserSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email or password'),
  password: string({ required_error: 'Password is required' }).min(
    1,
    'Password is required',
  ),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type CreateAdminInput = TypeOf<typeof createAdminSchema>;
