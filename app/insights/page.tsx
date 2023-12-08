import Post from '#/ui/Post';
import prisma from '#/lib/prisma';
import CreateInsight from '#/ui/create-insight';

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

  return (
    <>
      <div className="page">
        {/* <h1>Public Feed</h1> */}
        <main>
          <div className="mx-auto mt-16 grid grid-cols-2 gap-10">
            {feed.map((post: any) => (
              <Post key={post.id} postData={post} />
            ))}
            <CreateInsight/>
          </div>
        </main>
      </div>
    </>
  );
}
