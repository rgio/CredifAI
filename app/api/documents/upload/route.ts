import prisma from '../../../../lib/prisma';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
const pdf = require("pdf-parse-fork");
//import * as pdf from 'pdf-parse-fork';


export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  console.log(`UPLOADING FILE`)
  console.log(`filename: ${filename}`)
  console.log(`request.body: ${JSON.stringify(request.body)}`);

  // ⚠️ The below code is for App Router Route Handlers only
  let blob;
  if (filename && request.body) {
    //upload to blog storage
    blob = await put(filename, request.body, {
      access: 'public',
    });

    const result = await prisma.document.create({
      data: {
        url: blob.url,
        filename: blob.pathname,
      },
    });

    let extractedText = '';
    if (filename.endsWith('.pdf')) {
      // Fetch the PDF file from the blob URL
      const pdfResponse = await fetch(blob.url);
      const pdfBuffer = await pdfResponse.arrayBuffer();

      // Extract text from PDF
      const pdfData = await pdf(pdfBuffer);
      extractedText = pdfData.text;
    } else if (filename.endsWith('.txt')) {
      // Fetch the text file from the blob URL
      const textResponse = await fetch(blob.url);
      extractedText = await textResponse.text();
    } else {
      throw new Error('Unsupported file type');
    }

    const embeddingEndpoint = 'http://localhost:5000/embed_document'; // Replace [FLASK_SERVER_URL] with your Flask server's URL
    const embeddingResponse = fetch(`${embeddingEndpoint}?document_name=${encodeURIComponent(filename)}&text=${encodeURIComponent(extractedText)}`, {
      method: 'POST'
    });
    

    

  } else {
    console.error('Filename is missing');
    throw new Error('Filename is missing');
  }
  console.log('Blob', blob);
  return NextResponse.json(blob);
}
