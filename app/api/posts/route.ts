import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  console.log('GET /api/posts')
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      credential: {
        select: {
          name: true,
          imageUrl: true,
        }
      },
      comments: {
        include: {
          author: {
            select: {
              name: true,
            },
          }
        }
      },
    },
  });
  console.log(`POSTS: ${JSON.stringify(posts)}`);
  const credentials = await prisma.credential.findMany();
  const documents = await prisma.document.findMany();

  return NextResponse.json({
    posts,
    credentials,
    documents,
  });
}
