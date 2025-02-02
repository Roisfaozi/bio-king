import { NextRequest, NextResponse } from 'next/server';

const bioPagesData = [
  {
    id: '1',
    title: 'John Smith',
    image: 'https://picsum.photos/512/3',
    url: 'https://example.com/john-smith',
    views: 200,
    createdAt: '2023-01-01',
  },
  {
    id: '2',
    title: 'Jane Doe',
    image: 'https://picsum.photos/512/4',
    url: 'https://example.com/jane-doe',
    views: 150,
    createdAt: '2023-01-02',
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  try {
    const bioPage = bioPagesData.find((page) => page.id === id);

    if (bioPage) {
      return NextResponse.json({ status: 'success', data: bioPage });
    } else {
      throw new Error('Bio page not found');
    }
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({
        status: 'Internal Server Error',
        message: error.message,
      });
  }
}

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const newId = (bioPagesData.length + 1).toString();
  const newBioPage = { id: newId, ...reqBody };
  bioPagesData.push(newBioPage);
  return NextResponse.json({ status: 'success', data: newBioPage });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const index = bioPagesData.findIndex((page) => page.id === id);

  if (index !== -1) {
    bioPagesData.splice(index, 1);
    return NextResponse.json({
      status: 'success',
      message: 'Bio page deleted',
    });
  } else {
    return NextResponse.json({ status: 'fail', message: 'Bio page not found' });
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const reqBody = await request.json();
  const index = bioPagesData.findIndex((page) => page.id === id);

  if (index !== -1) {
    bioPagesData[index] = { ...bioPagesData[index], ...reqBody };
    return NextResponse.json({ status: 'success', data: bioPagesData[index] });
  } else {
    return NextResponse.json({ status: 'fail', message: 'Bio page not found' });
  }
}
