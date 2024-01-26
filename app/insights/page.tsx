import Post from '#/ui/post';
import prisma from '#/lib/prisma';
import CreateInsight from '#/ui/create-insight';
import PostFeed from '#/ui/post-feed';

// This function gets called at build time
async function getData() {
  // Call an external API endpoint to get posts
  // You can use your prisma client here if you're fetching from your own database
  const res = await fetch(`${process.env.API_ROOT}/api/posts`);
  const data = await res.json();

  console.log(`DATA: ${JSON.stringify(data)}`);

  // By returning { props: data }, the Page component
  // will receive `data` as a prop at build time
  return {
    feed: data.posts,
    credentials: data.credentials,
    documents: data.documents,
  };
}

export default async function Page() {
  // const feed = await prisma.post.findMany({
  //   where: {
  //     published: true,
  //   },
  //   include: {
  //     author: {
  //       select: {
  //         name: true,
  //       },
  //     },
  //     credential: {
  //       select: {
  //         name: true,
  //         imageUrl: true,
  //       }
  //     },
  //     comments: {
  //       include: {
  //         author: {
  //           select: {
  //             name: true,
  //           },
  //         }
  //       }
  //     },
  //   },
  // });
  // console.log(`POSTS: ${JSON.stringify(feed)}`);
  // const credentials = await prisma.credential.findMany();
  // const documents = await prisma.document.findMany();
  // console.log(`CREDENTIALS: ${JSON.stringify(credentials)}`);
  // const res = await fetch(`/api/posts`);
  // const data = await res.json();
  // console.log(`DATA: ${JSON.stringify(data)}`);
  const { feed, credentials, documents } = await getData();

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
