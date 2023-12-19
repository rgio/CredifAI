'use client';
import Credential from '#/ui/credential';
import { useSSX } from 'ui/_ssx';

export default async function Page({ params }: { params: { id: string } }) {
  const { ssx } = useSSX();

  const credentialsList = await ssx?.storage.list();

  const credentials = credentialsList?.data?.map((key: any) => ({
    key,
    title: key && key.split('/')[2].split('Verification')[0] || null,
  }));

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
