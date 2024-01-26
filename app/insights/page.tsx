import Post from '#/ui/post';
import prisma from '#/lib/prisma';
import CreateInsight from '#/ui/create-insight';
import PostFeed from '#/ui/post-feed';

// This function gets called at build time
async function getData() {
  // Call an external API endpoint to get posts
  // You can use your prisma client here if you're fetching from your own database
  // const res = await fetch(`${process.env.API_ROOT}/api/posts`);
  const url = process.env.LOCAL ? "http://localhost:3000/api/posts" : "https://" + process.env.VERCEL_URL + "/api/posts";
  console.log(`VERCEL URL: ${url}`)
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(`RES: ${JSON.stringify(res)}`)
  const text = await res.text();
  console.log(`TEXT: ${text}`);

  if (!res.ok) {
    const text = await res.text(); // Get the response as text
    console.error("Failed to fetch JSON:", text); // Log the text to see what's returned
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

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
