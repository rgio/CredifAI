import prisma from '../../../../lib/prisma';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  console.log(`UPLOADING FILE`)
  console.log(`filename: ${filename}`)
  console.log(`request.body: ${request.body}`);

  // ⚠️ The below code is for App Router Route Handlers only
  let blob;
  if (filename && request.body) {
    blob = await put(filename, request.body, {
      access: 'public',
    });

    const result = await prisma.document.create({
      data: {
        url: blob.url,
        filename: blob.pathname,
      },
    });

  } else {
    console.error('Filename is missing');
    throw new Error('Filename is missing');
  }
  console.log('Blob', blob);
  return NextResponse.json(blob);
}
