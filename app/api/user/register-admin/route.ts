import db from '@/lib/db';
import { createAdminSchema } from '@/validation/auth-validation';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { isAdmin } from '@/lib/utils';

// Token untuk autentikasi admin pertama (sebaiknya simpan di .env)
const ADMIN_REGISTRATION_TOKEN =
  process.env.ADMIN_REGISTRATION_TOKEN || 'admin-secret-token-2024';

export async function POST(request: NextRequest) {
  try {
    // Parse body request
    const body = await request.json();
    const { name, email, password, token } = createAdminSchema.parse(body);

    // Cek session user yang melakukan request
    const session = await getAuthSession();

    // Jika bukan admin yang melakukan request, harus menggunakan token
    if (!session?.user || !isAdmin(session)) {
      // Validasi token admin
      if (token !== ADMIN_REGISTRATION_TOKEN) {
        return NextResponse.json(
          {
            status: 403,
            message: 'Token admin tidak valid',
          },
          { status: 403 },
        );
      }
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        {
          status: 400,
          message: 'Email sudah terdaftar',
        },
        { status: 400 },
      );
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user admin baru
    const newAdmin = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'ADMIN',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
      },
    });

    return NextResponse.json(
      {
        status: 201,
        message: 'Akun admin berhasil dibuat',
        data: newAdmin,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating admin account:', error);
    return NextResponse.json(
      {
        status: 500,
        message: 'Terjadi kesalahan saat membuat akun admin',
      },
      { status: 500 },
    );
  }
}
