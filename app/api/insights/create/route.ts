import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server'

// POST /api/insights/create
export async function POST(req: Request) {
  try {
    const text = await req.text();
    const { title, description, credentialId, color } = JSON.parse(text);

    const result = await prisma.post.create({
      data: {
        title: title,
        color: color,
        published: true,
        content: description,
        author: { connect: { email: 'rob@truedot.ai' } },
        credential: { connect: { id: credentialId }},
      },
    });

    return NextResponse.json({ data: result }, { status: 200 })
  } catch (error) {
    console.log(error)
  }

}
