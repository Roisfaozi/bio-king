import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const data = {
    id: '3',
    ...reqBody,
  };
  return NextResponse.json({ status: 'success', data });
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'success',
    data: [
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
    ],
  });
}
