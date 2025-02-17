import db from '@/lib/db';
import { createUserSchema } from '@/validation/auth-validation';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest, response: any) {
  try {
    const { name, email, password } = createUserSchema.parse(
      await request.json(),
    );
    console.log('dari req', name, email, password);
    const existingUser = await db.user.findUnique({ where: { email } });
    console.log('dari db', existingUser);
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
        role: 'user',
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
