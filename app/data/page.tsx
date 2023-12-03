import Post from '#/ui/Post';
import prisma from '#/lib/prisma';

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
    },
  });

  return (
    <>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {feed.map((post: any) => (
            <div key={post.id} className="mx-auto mt-16 grid grid-cols-2 gap-4">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      {/* <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style> */}
    </>
  );
}
