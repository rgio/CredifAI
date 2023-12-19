import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

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

    // const path = 'test.pdf';
    // const comments = [content];
    // const sources = ['rob@truedot.ai'];
    // // const embeddingResponse = fetch(`${embeddingEndpoint}?document_path=${encodeURIComponent(filename)}&comments=${encodeURIComponent(JSON.stringify(comments))}&sources=${encodeURIComponent(JSON.stringify(sources))}`, {
    // //   method: 'POST'
    // // });

    // const embeddingEndpoint = 'http://localhost:5000/add_verified_comments'; // Replace [FLASK_SERVER_URL] with your Flask server's URL
    // const embeddingResponse = await fetch(embeddingEndpoint, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     document: path,
    //     comments: comments,
    //     sources: sources
    //   })
    // });
    // const json = await embeddingResponse.json();
    // console.log(`RESPONSE IS ${JSON.stringify(json)}`)

    return NextResponse.json(result);
  } catch (error) {
    console.log(error)
  }

}
