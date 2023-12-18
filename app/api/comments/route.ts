import prisma from '../../../lib/prisma';

// POST /api/comment
// Required fields in body: content
export async function POST(req: Request) {
  try {
    const text = await req.text();
    const { content, opinion, postId } = JSON.parse(text);
    console.log(`content: ${content}`);
    console.log(`opinion: ${opinion}`);

    const result = await prisma.comment.create({
      data: {
        content: content,
        opinion: opinion,
        post: { connect: { id: postId }},
        author: { connect: { email: 'rob@truedot.ai' } },
      },
    });

    return Response.json({ result });
  } catch (error) {
    console.log(error)
  }

}
