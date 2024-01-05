import Post from '#/ui/post';
import prisma from '#/lib/prisma';
import CreateInsight from '#/ui/create-insight';
import PostFeed from '#/ui/post-feed';

export default async function Page({ params }: { params: { id: string } }) {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              name: true,
            },
          }
        }
      },
    },
  });
  console.log(`POSTS: ${JSON.stringify(feed)}`);
  const credentials = await prisma.credential.findMany();
  const documents = await prisma.document.findMany();
  console.log(`CREDENTIALS: ${JSON.stringify(credentials)}`);

  return (
    <div className="page">
      <div className="mx-auto h-full max-w-4xl space-y-8 p-px px-2 pt-20 lg:px-12 lg:py-16">
        <main>
          <div className="pb-24">
            <PostFeed postsData={feed} credentialsData={credentials} documentsData={documents}/>
          </div>
        </main>
      </div>
    </div>
  );
}
