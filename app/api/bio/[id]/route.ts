import { getAuthSession } from '@/lib/auth';
import { withRLS } from '@/lib/db';
import { updateBioPageWithLinks } from '@/lib/db-transaction/bio';
import { logError } from '@/lib/helper';
import { editBioPageSchema } from '@/validation/bio';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

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
    const serializedData = JSON.parse(
      JSON.stringify(bioPage, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    );
    return NextResponse.json(
      { status: 'success', data: serializedData },
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
    logError('Unauthorized');
    return NextResponse.json(
      { status: 'fail', message: 'Unauthorized' },
      { status: 401 },
    );
  }
  const id = params.id;
  const userId = session?.user?.id;
  try {
    const data = await request.json();

    // Now validate with your schema
    const validatedData = editBioPageSchema.parse(data);
    const res = await updateBioPageWithLinks(userId, id, validatedData);

    return NextResponse.json({ status: 'success', data: res }, { status: 200 });
  } catch (error) {
    let res;
    if (error instanceof z.ZodError) {
      res = {
        status: 'fail validation',
        message: error.issues.map((issue) => issue.message).join(', '),
      };
      logError('error from zod');
      return NextResponse.json(res, { status: 400 });
    }

    res = { status: 500, message: 'Internal Server Error', error: error };
    logError('error 500', error);
    return NextResponse.json(res, { status: 500 });
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
