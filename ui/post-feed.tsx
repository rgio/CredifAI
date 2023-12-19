'use client';
import { useState } from 'react';
import Post from '#/ui/post';
import CreateInsight from '#/ui/create-insight';

export default function PostFeed({postsData, credentialsData, documentsData}:{postsData:any, credentialsData:any, documentsData:any}) {
  const [posts, setPosts] = useState(postsData);
  const [credentials, setCredentials] = useState(credentialsData);
  const [documents, setDocuments] = useState(documentsData);

  return (
    <div className="mx-auto mt-16 grid grid-cols-2 gap-10">
      <CreateInsight posts={posts} setPosts={setPosts} credentials={credentials} documents={documents}/>
      {posts.map((post: any) => (
        <Post key={post.id} postData={post} />
      ))}
    </div>
  );
}