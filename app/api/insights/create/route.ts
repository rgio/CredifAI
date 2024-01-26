import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server'

// POST /api/insights/create
export async function POST(req: Request) {
  try {
    const text = await req.text();
    console.log(`TEXT IS ${text}`);
    const { path, title, description, credentialId, color } = JSON.parse(text);

    console.log(`CREDENTIAL ID: ${credentialId}`);

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

    console.log(`RESULT IS ${JSON.stringify(result)}`)

    //const path = 'test.pdf';
    const comments = [description];
    let sources;
    if (credentialId == 'clqcs6195000yy9gwdnmonfkk') {
      sources = ['Marketing Director @Target'];
    }
    else {
      sources = ['AI Researcher @Google'];
    }
   
    const embeddingEndpoint = 'https://credifai-backend.onrender.com/add_verified_comments'; // Replace [FLASK_SERVER_URL] with your Flask server's URL
    const embeddingResponse = await fetch(embeddingEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        document: path,
        comments: comments,
        sources: sources
      })
    });
    const json = await embeddingResponse.json();
    console.log(`RESPONSE IS ${JSON.stringify(json)}`)

    return NextResponse.json({ data: result }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }

}
