import UploadDocumentForm from 'ui/upload-document-form';
import prisma from '#/lib/prisma';
import DownloadIcon from '@mui/icons-material/Download';

const util = require('util');

export default async function Page({ params }: { params: { id: string } }) {
  const documents = await prisma.document.findMany();

  // console.log(`documents: ${util.inspect(documents)}`);

  return (
    <div className="mx-auto mt-16 grid grid-cols-2 gap-10">
      {documents && documents.map((document: any) => (
        <div 
          key={document.id}
          className="relative flex items-center p-12 text-center block w-64 h-80 rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white"
        >
          {/* <NoteAdd className="mx-auto h-12 w-12 text-gray-400"/> */}
          <div className="flex flex-col">
            <span className="mt-2 block text-sm font-semibold text-gray-900">{document.filename}</span>
            <a href={document.url} download>
              <DownloadIcon className="mt-2 cursor-pointer mx-auto h-12 w-12 text-gray-400"/>
            </a>
          </div>
        </div>
      ))}
      <UploadDocumentForm />
    </div>
  );
}
