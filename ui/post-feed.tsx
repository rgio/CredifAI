'use client';
import { useState } from 'react';
import Post from '#/ui/post';
import CreateInsight from '#/ui/create-insight';

export default function PostFeed({postsData, credentialsData}:{postsData:any, credentialsData:any}) {
  const [posts, setPosts] = useState(postsData);
  const [credentials, setCredentials] = useState(credentialsData);

  return (
    <div className="mx-auto mt-16 grid grid-cols-2 gap-10">
      {posts.map((post: any) => (
        <Post key={post.id} postData={post} />
      ))}
      <CreateInsight posts={posts} setPosts={setPosts} credentials={credentials}/>
    </div>
  );
}