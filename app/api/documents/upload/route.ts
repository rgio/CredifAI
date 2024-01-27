import prisma from '../../../../lib/prisma';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
const pdf = require("pdf-parse-fork");
//import * as pdf from 'pdf-parse-fork';

const util = require('util');

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  const storageId = searchParams.get('storageId');

  console.log(`UPLOADING FILE`)
  console.log(`filename: ${filename}`)
  console.log(`storageId: ${storageId}`)
  // console.log(`request.body: ${JSON.stringify(request.body)}`);

  // ⚠️ The below code is for App Router Route Handlers only
  let blob;
  if (filename && request.body) {
    //upload to blog storage
    // blob = await put(filename, request.body, {
    //   access: 'public',
    // });
    // const response = await fetch(
    //   `https://hallowed-warthog-351.convex.site/get_file?storageId=${storageId}`,
    //   {
    //     method: 'GET',
    //   },
    // );
    // blob = await response.blob();
    // const text = await blob.text();
    // console.log(`text: ${JSON.stringify(text)}`)
    //const url = new URL(blob);
    // const url = new URL(blob);
    const url = `https://hallowed-warthog-351.convex.site/get_file?storageId=${storageId}`;

    const result = await prisma.document.create({
      data: {
        url,
        filename,
      },
    });

    let extractedText = '';
    if (filename.endsWith('.pdf')) {
      // Fetch the PDF file from the blob URL
      const pdfResponse = await fetch(url);
      const pdfBuffer = await pdfResponse.arrayBuffer();

      // Extract text from PDF
      const pdfData = await pdf(pdfBuffer);
      extractedText = pdfData.text;
    } else if (filename.endsWith('.txt')) {
      // Fetch the text file from the blob URL
      const textResponse = await fetch(url);
      extractedText = await textResponse.text();
    } else {
      throw new Error('Unsupported file type');
    }

    console.log(`EMBEDDING`);
    console.log(`EXTRACTED TEXT: ${extractedText}`)

    const embeddingEndpoint = 'https://credifai-backend.onrender.com/embed_document'; // Replace [FLASK_SERVER_URL] with your Flask server's URL
    const embeddingResponse = await fetch(`${embeddingEndpoint}?document_name=${encodeURIComponent(filename)}&text=${encodeURIComponent(extractedText)}`, {
      method: 'POST'
    });

    // const text = await embeddingResponse.text();
    // console.log(`EMBEDDING RESPONSE: ${text}`);

  } else {
    console.error('Filename is missing');
    throw new Error('Filename is missing');
  }
  // console.log('Blob', blob);
  return NextResponse.json(storageId);
}
