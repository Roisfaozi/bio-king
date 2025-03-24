import { getAuthSession } from '@/lib/auth';
import db from '@/lib/db';
import { UserRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const session = await getAuthSession();
    const id = session?.user?.id;

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: id },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.role !== UserRole.ADMIN && user.id !== session.user.id) {
      return NextResponse.json(
        { message: 'You do not have permission to access this resource' },
        { status: 403 },
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log('An error occurred:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, response: NextResponse) {
  try {
    const session = await getAuthSession();
    const id = session?.user?.id;

    const data = await request.json();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: id },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.role !== UserRole.ADMIN && user.id !== session.user.id) {
      return NextResponse.json(
        { message: 'You do not have permission to access this resource' },
        { status: 403 },
      );
    }

    const updatedUser = await db.user.update({
      where: { id: id },
      data: {
        profile: {
          update: {
            ...data,
          },
        },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log('An error occurred:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, response: NextResponse) {
  try {
    const session = await getAuthSession();
    const id = session?.user?.id;

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: id },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.role !== UserRole.ADMIN && user.id !== session.user.id) {
      return NextResponse.json(
        { message: 'You do not have permission to access this resource' },
        { status: 403 },
      );
    }

    await db.user.update({
      where: { id: id },
      data: {
        profile: {
          delete: true,
        },
      },
    });

    return NextResponse.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.log('An error occurred:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
}
