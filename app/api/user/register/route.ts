import db from '@/lib/db';
import { createUserSchema } from '@/validation/auth-validation';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = createUserSchema.parse(
      await request.json(),
    );
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({
        status: 400,
        message: 'A user with the related email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
      },
    });
    console.log('user baru', newUser);
    return NextResponse.json({
      status: 201,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (e) {
    console.log('An error occurred:', e);
    return NextResponse.json({
      status: 500,
      message: 'Something went wrong',
      data: e,
    });
  }
}
