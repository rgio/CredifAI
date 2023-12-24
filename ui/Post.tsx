'use client';
import React from "react";
import { Fragment, useState, useEffect } from 'react'
import { Listbox, Dialog, Transition } from '@headlessui/react'
import { QuestionMark, Check, Clear } from "@mui/icons-material";
import { useSSX } from 'ui/_ssx';

const util = require('util');

export type PostProps = {
  id: number;
  title: string;
  color: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  comments: Comment[];
  numComments: number;
};

type Comment = {
  id: number;
  author: {
    name: string;
  },
  content: string;
  opinion: string;
}

const opinions = [
  { name: 'No Opinion', value: '' },
  { name: 'Agree', value: 'agree' },
  { name: 'Disagree', value: 'disagree' },
  // More items...
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function Comment({ comment }: { comment: Comment }) {
  return (
    <div className="mt-2">
      <div className="flex flex-row text-left">
        <div className="relative">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-400 ring-8 ring-white">
            {comment.author.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="min-w-0 flex-1 ml-4">
          <div>
            <div className="text-base font-medium text-gray-900">
              {comment.author.name}
            </div>
            <p className="text-base text-gray-500">{`${comment.opinion.charAt(0).toUpperCase() + comment.opinion.slice(1)}d 1m ago`}</p>
            <div className="mt-2 text-base text-gray-700 text-left">
              <p>{comment.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const commentToAttestationText = (comment: any) => {
  const { content, opinion } = comment;
  const data = {
    content,
    opinion,
  };
  return JSON.stringify(data);
};

function CommentInput({ post, setPost }: { post: PostProps, setPost: React.Dispatch<React.SetStateAction<PostProps>> }) {
  const [opinion, setOpinion] = useState(opinions[0]);
  const [content, setContent] = useState("");
  const [issueAttestation, setIssueAttestation] = useState<any>();

  const { ssx } = useSSX();

  const importIssue = async () => {
    console.log(`_ISSUE`)
    const rebase = await import('lib/utils/rebase');
    setIssueAttestation(rebase);
    // issue(content, address, sign);
    //TODO: return jwt
  }

  useEffect(() => {
    importIssue();
  }, []);

  useEffect(() => {
    console.log(`IN USE EFFECT: ${util.inspect(issueAttestation)}`);
  }, [issueAttestation]);

  const handleGenerateAttestation = async (comment: any) => {
    console.log(`GENERATE ATTESTATION SSX: ${util.inspect(ssx)}`);
    //console.log(`SESSION: ${util.inspect(ssx!.userAuthorization.session)}`);
    if (!ssx) return;
    // if (!selectedConversation) return;
    // setModalState(ModalState.AttestLoading);

    const address = ssx.userAuthorization.address();
    // console.log(`ADDRESS: ${address}`);
    // console.log(`SESSION ADDRESS: ${ssx.userAuthorization.session && ssx.userAuthorization.session.address}`);
    const sign = (x: any) => ssx.userAuthorization.signMessage(x);
    const body = commentToAttestationText(comment);
    const content = { body, title: comment.content };
    console.log(`in handle generate attestation: ${util.inspect(issueAttestation)}`);
    console.log(`CONTENT: ${util.inspect(content)}`);
    console.log(`ADDRESS: ${util.inspect(address)}`);
    console.log(`SIGN: ${util.inspect(sign)}`);
    let jwt = await issueAttestation.issue(content, address || '', sign);
    console.log(`JWT FROM ISSUE: ${jwt}`);


    // let jwt = await issue(content, address || '', sign);
    // const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    // setCredential(jwt);
    // setModalState(ModalState.AttestDownload);
  };

  async function handleSubmitComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const body = { opinion: opinion.value, content, postId: post.id };
      const res = await fetch(`/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      handleGenerateAttestation({ opinion: opinion.value, content });

      setOpinion(opinions[0]);
      setContent("");
      setPost({...post, comments: [{id: 0, content: content, opinion: opinion.value, author: {name: "Rob"}}, ...post.comments ]});
    } catch (error) {
      console.error(error);
    }
  }

  function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  return (
    <form action="#" className="relative" onSubmit={handleSubmitComment}>
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          rows={2}
          name="description"
          id="description"
          className="block w-full resize-none border-0 pt-2.5 text-lg text-gray-900 placeholder:text-lg placeholder:text-gray-400 focus:ring-0"
          placeholder="Share your opinion..."
          value={content}
          onChange={handleTextChange}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-px bottom-0">
        {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
        <div className="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3">
          <Listbox as="div" value={opinion} onChange={setOpinion} className="flex-shrink-0">
            {({ open }) => (
              <>
                <Listbox.Label className="sr-only">Add an opinion</Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative w-30 inline-flex items-center whitespace-nowrap rounded-full bg-gray-100 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 sm:px-3">
                    { opinion.value === '' &&
                      <QuestionMark className="h-5 w-5 flex-shrink-0 sm:-ml-1 text-gray-300" aria-hidden="true" />
                    }
                    { opinion.value === 'agree' &&
                      <Check className="h-5 w-5 flex-shrink-0 sm:-ml-1 text-green-500" aria-hidden="true" />
                    }
                    { opinion.value === 'disagree' &&
                      <Clear className="h-5 w-5 flex-shrink-0 sm:-ml-1 text-red-500" aria-hidden="true" />
                    }
                    <span
                      className={classNames(
                        opinion.value === null ? '' : 'text-gray-900',
                        'hidden truncate sm:ml-2 sm:block'
                      )}
                    >
                      {opinion.value === null ? 'Opinion' : opinion.name}
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute text-gray-900 right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {opinions.map((opinion) => (
                        <Listbox.Option
                          key={opinion.value}
                          className={({ active }) =>
                            classNames(
                              active ? 'bg-gray-100' : 'bg-white',
                              'relative cursor-default select-none px-3 py-2'
                            )
                          }
                          value={opinion}
                        >
                          <div className="flex items-center">
                            <span className="block truncate font-medium">{opinion.name}</span>
                          </div>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex">
            {/* <button
              type="button"
              className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
            >
              <PaperClipIcon className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500" aria-hidden="true" />
              <span className="text-sm italic text-gray-500 group-hover:text-gray-600">Attach a file</span>
            </button> */}
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}


function PostDetail({ post, open, setOpen, setPost }: { 
  post: PostProps, 
  open: boolean, 
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setPost: React.Dispatch<React.SetStateAction<PostProps>>,
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10 w-10/12" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-2/3 h-[80vh] transform overflow-scroll rounded-lg bg-white text-left shadow-xl transition-all">
                <div>
                  <div className="relative h-44 overflow-hidden" style={{backgroundColor: post.color}}/>
                  <div className="mt-3 mb-3 text-center sm:mt-5 px-12 pt-5 pb-4">
                    <Dialog.Title as="h1" className="font-cal text-4xl font-bold tracking-wide text-black">
                      {post.title}
                    </Dialog.Title>
                    <div className="mt-6">
                      <p className="text-lg text-left text-stone-500">
                        {post.content}
                      </p>
                    </div>
                    <div className="mt-6">
                      <CommentInput post={post} setPost={setPost}/>
                    </div>
                    <div className="mt-6">
                      {post.comments.map((comment: any) => (
                        <Comment key={comment.id} comment={comment} />
                      ))}
                    </div>
                  </div>
                </div>
                {/* <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setOpen(false)}
                  >
                    Go back to dashboard
                  </button>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default function Post({ postData }: { postData: PostProps }) {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState(postData);
  const authorName = post.author ? post.author.name : "Unknown";
  
  const credential = {
    name: 'GitHub',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSevjLMoY69RrmdOeKZONLsRySpvdkEwP-SaraZ3hc_8WFS0eR1ALIIL9xuP2_nWbRnawY&usqp=CAU'
  }

  return (
    <div onClick={(e) => {e.preventDefault(); setOpen(true)}} className="w-100 cursor-pointer rounded-lg border border-stone-200 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <div className="flex flex-col overflow-hidden rounded-lg">
        <div className="relative h-44 overflow-hidden" style={{backgroundColor: post.color}}/>
        <div className="border-t border-stone-200 p-4 dark:border-stone-700">
          <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide text-black">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {post.content}
          </p>
          <div className="flex flex-row justify-between">
            <span className="flex mt-2 items-center justify-center text-black text-sm text-bold">@{authorName}</span>
            <div className="flex flex-row">
              {/* <span className="flex mt-2 mr-2 items-center justify-center text-black text-sm text-bold">Requires </span> */}
              <div className="flex flex-row bg-gray-300 rounded-full px-2 mt-2" style={{width: 'fit-content'}}>
                <div className="flex items-center">
                  <img className="h-5 w-5 rounded-full" src={credential.imageUrl} alt="" />
                </div>
                <span className="mx-3 block text-sm py-1.5 text-gray-900 truncate">{credential.name}</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 flex w-full px-4">
        {/* <a
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV
              ? `https://${url}`
              : `http://${data.site?.subdomain}.localhost:3000/${data.slug}`
          }
          target="_blank"
          rel="noreferrer"
          className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
        >
          {url} ↗
        </a> */}
      </div>
      <PostDetail post={post} open={open} setOpen={setOpen} setPost={setPost} />
    </div>
  );
};
