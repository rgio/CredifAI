'use client';

import type { PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useRef, useState } from 'react';
import { NoteAdd } from '@mui/icons-material';

const util = require('util');

export default function UploadDocumentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      submitRef?.current?.click();
    }
  };
  
  return (
    <form ref={formRef}
      onSubmit={async (event) => {
        console.log(`UPLOADING`)
        event.preventDefault();
        if (!inputFileRef.current?.files) {
          throw new Error("No file selected");
        }

        const file = inputFileRef.current.files[0];

        const res = await fetch('https://hallowed-warthog-351.convex.site/generate_upload_url');
        const url = await res.text();
        console.log(`data: ${util.inspect(url)}`)

        const result = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": file!.type },
          body: file,
        });
        const { storageId } = await result.json();

        console.log(`STORAGE ID: ${util.inspect(storageId)}`);

        const response = await fetch(
          `/api/documents/upload?filename=${file.name}&storageId=${storageId}`,
          {
            method: 'POST',
          },
        );

        // const newBlob = (await response.json()) as PutBlobResult;

        // const newBlob = await upload(file.name, file, {
        //   access: 'public',
        //   handleUploadUrl: '/api/documents/upload',
        // });

        // setBlob(newBlob);
      }}
    >
    <input name="file" ref={inputFileRef} onChange={handleFileChange} type="file" required style={{display: 'none'}} />
    <button
      type="button"
      onClick={() => {inputFileRef.current?.click()}}
      className="relative block w-64 h-80 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400"
    >
      <NoteAdd className="mx-auto h-12 w-12 text-gray-400"/>
      <span className="mt-2 block text-sm font-semibold text-gray-900">Upload a document</span>
    </button>
    <input type="submit" style={{display: 'none'}} ref={submitRef}/>
    </form>
  );
}
