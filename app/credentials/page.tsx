'use client';
import Credential from '#/ui/credential';
import { useSSX } from 'ui/_ssx';
import { useEffect } from 'react';

export default async function Page({ params }: { params: { id: string } }) {
  // const { ssx } = useSSX();

  // const credentialsList = await ssx?.storage.list();
  // let credentials = [];

  // credentials = credentialsList?.data?.map((key: any) => ({
  //   key,
  //   title: key && key.split('/')[2].split('Verification')[0] || null,
  // }));

  // useEffect(() => {
  //   if (ssx) {
  //     credentials.push({
  //       key: 'Marketing Director @Target',
  //       title: 'Marketing Director @Target',
  //     });
  //     credentials.push({
  //       key: 'AI Researcher @Google',
  //       title: 'AI Researcher @Google'
  //     })
  //   }
  // }, []);

  const credentials = [
    {
      key: 'Email',
      title: 'Email',
    },
    {
      key: 'GitHub',
      title: 'GitHub',
    },
    {
      key: 'Marketing Director @Target',
      title: 'Marketing Director @Target',
    },
    {
      key: 'AI Researcher @Google',
      title: 'AI Researcher @Google'
    }
  ]
  
  return (
    <div className="page">
      <div className="mx-auto h-full max-w-4xl space-y-8 p-px px-2 pt-20 lg:px-12 lg:py-16">
        <main>
          <div className="mx-auto mt-16 grid grid-cols-1 gap-10">
            {credentials && credentials.map((credential: any) => (
              <Credential key={credential.key} credential={credential} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
