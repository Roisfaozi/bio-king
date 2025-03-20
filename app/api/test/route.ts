import { bypassRLS } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: get paginated users
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: page number
 *     responses:
 *       200:
 *         description: paginated users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *     example:
 *       GET /api/test?page=2 HTTP/1.1
 *       {
 *         "users": [
 *           {
 *             "id": 3,
 *             "name": "Yanick",
 *             "email": "yanick@example.com"
 *           },
 *           {
 *             "id": 4,
 *             "name": "Steve",
 *             "email": "steve@example.com"
 *           }
 *         ]
 *       }
 */

export const GET = async (request: NextRequest) => {
  const prisma = bypassRLS();
  const page: number = Number(request.nextUrl.searchParams.get('page') || 1);
  const limit: number = 5;

  const users = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  return NextResponse.json({ status: 'success', data: users }, { status: 200 });
};
