import { getAuthSession } from '@/lib/auth';
import { withRLS } from '@/lib/db';
import { editBioPageSchema } from '@/validation/bio';
import { NextRequest, NextResponse } from 'next/server';

// Helper function for error logging
function logError(message: string, error?: unknown) {
  console.error(message, error);
}

// GET by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json(
      { status: 'fail', message: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const db = withRLS(session?.user?.id);
    const bioPage = await db.bioPages.findUnique({
      where: { id: params.id },
      include: {
        socialLinks: true,
        bioLinks: true,
      },
    });

    if (!bioPage) {
      return NextResponse.json(
        { status: 'fail', message: 'Bio page not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { status: 'success', data: bioPage },
      { status: 200 },
    );
  } catch (error) {
    logError('Error fetching bio page', error);
    return NextResponse.json(
      { status: 'fail', message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

// PATCH
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json(
      { status: 'fail', message: 'Unauthorized' },
      { status: 401 },
    );
  }

  const id = params.id;
  const reqBody = await request.json();
  const updateBioSchema = editBioPageSchema.partial();

  try {
    const db = withRLS(session?.user?.id);

    const result = await db.bioPages.update({
      where: { id },
      data: updateBioSchema.parse(reqBody),
    });

    return NextResponse.json(
      { status: 'success', data: result },
      { status: 200 },
    );
  } catch (error) {
    logError('Error updating bio page', error);
    return NextResponse.json(
      { status: 'fail', message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

// DELETE
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    return NextResponse.json(
      { status: 'fail', message: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const id = params.id;

    const db = withRLS(session?.user?.id);

    const bioPage = await db.bioPages.findUnique({
      where: { id },
    });
    if (!bioPage) {
      return NextResponse.json(
        { status: 'fail', message: 'Bio page not found' },
        { status: 404 },
      );
    }

    await db.bioPages.delete({
      where: { id },
    });

    return NextResponse.json(
      { status: 'success', message: 'Bio page deleted' },
      { status: 200 },
    );
  } catch (error) {
    logError('Error deleting bio page', error);
    return NextResponse.json(
      { status: 'fail', message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
