'use client';
const util = require('util');
import { Fragment, useState } from 'react'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { CirclePicker } from 'react-color';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

type Credential = {
  id: string,
  name: string,
  imageUrl: string,
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function CredentialSelector({credential, setCredential, credentials}: {
  credential: Credential,
  setCredential: React.Dispatch<React.SetStateAction<string>>,
  credentials: any,
}) {
  return (
    <Listbox value={credential} onChange={setCredential}>
      {({ open }: { open: boolean }) => (
        <>
          <Listbox.Label className="block mt-2 text-left text-bold text-base font-medium leading-6 text-gray-900">Credential</Listbox.Label>
          <p className="text-left text-sm text-gray-500" id="email-description">
            Who can respond to this insight?
          </p>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                {/* <span
                  aria-label={selected.online ? 'Online' : 'Offline'}
                  className={classNames(
                    selected.online ? 'bg-green-400' : 'bg-gray-200',
                    'inline-block h-2 w-2 flex-shrink-0 rounded-full'
                  )}
                /> */}
                {/* TODO add credential name */}
                <div className="flex-shrink-0">
                  <img className="h-6 w-6 rounded-full" src={credential.imageUrl} alt="" />
                </div>
                <span className="ml-3 block text-lg py-1.5 text-gray-900 truncate">{credential.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                { open ? <ExpandLess className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <ExpandMore className="h-5 w-5 text-gray-400" aria-hidden="true" />}
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {credentials.map((c) => (
                  <Listbox.Option
                    key={c.id}
                    className={({ active }: { active: any}) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={c}
                  >
                    {({ credential, active }: { credential: any, active: any}) => (
                      <>
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img className="h-6 w-6 rounded-full" src={c.imageUrl} alt="" />
                          </div>
                          <span
                            className={classNames(credential ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {c.name}
                          </span>
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}


function CreateInsightForm({open, setOpen, credentials, posts, setPosts}: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, credentials: any, posts: any, setPosts: any}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#BD4CA5");
  const [credential, setCredential] = useState(credentials[0]);

  const handleCreateInsight = async (e: any) => {
    console.log(`HANDLE CREATE INSIGHT`)
    e.preventDefault();

    const body = {
      title: e.target.title.value,
      description: e.target.description.value,
      credentialId: credential.id,
      color: color,
    }

    const response = await fetch(
      `/api/insights/create`,
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    const responseJson = await response.json();
    const postData = responseJson.data;
    postData.comments = [];
    // console.log(`POSTS: ${util.inspect(posts)}`);
    setPosts([...posts, postData]);

    console.log(`CREATE RESPONSE: ${util.inspect(postData)}`);
    setTitle("");
    setDescription("");
    setColor("#BD4CA5");
    setCredential(credentials[0]);
    setOpen(false);
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }

  const handleColorChange = (color: any, event: any) => {
    setColor(color.hex);
  }

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
                  <div className="relative h-44 overflow-hidden" style={{backgroundColor: color}}>
                    <div className="absolute p-1 bottom-4 right-12 bg-gray-100 rounded-lg">
                      <CirclePicker color={color} onChange={handleColorChange} width={180} className="flex" circleSpacing={8} colors={['#BD4CA5','#3993DD','#29E7CD','#F7AA2F','#de1024']} />
                    </div>
                  </div>
                  <div className="mt-3 mb-3 text-center sm:mt-5 px-12 pt-5 pb-4">

                    <form action="#" className="relative" onSubmit={handleCreateInsight}>
                      <label htmlFor="title" className="block text-left text-bold text-base mb-2 font-medium leading-6 text-gray-900">
                        Title
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="title"
                          id="title"
                          className="block w-full text-lg placeholder:text-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                          placeholder="Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      
                      <label htmlFor="description" className="mt-2 block text-left text-bold text-base mb-2 font-medium leading-6 text-gray-900">
                        Description
                      </label>
                      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                        <textarea
                          rows={2}
                          name="description"
                          id="description"
                          className="block w-full resize-none border-0 pt-2.5 text-lg text-gray-900 placeholder:text-lg placeholder:text-gray-400 focus:ring-0"
                          placeholder="Add a description"
                          value={description}
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
                      <CredentialSelector credential={credential} setCredential={setCredential} credentials={credentials}/>
                      <div className="mt-4 flex flex-row justify-between">
                        <button
                          type="button"
                          className="flex-start inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={() => {setOpen(false)}}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-end ml-6 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default function CreateInsight({credentials, posts, setPosts}: {credentials: any, posts: any, setPosts: any}) {
  const [open, setOpen] = useState(false);
  //const [post, setPost] = useState(postData);
  //const authorName = post.author ? post.author.name : "Unknown author";

  return (
    <div onClick={(e) => {e.preventDefault(); setOpen(true)}} className="relative block w-100 h-[304.25px] rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400">
      <div className="justify-center items-center h-full flex flex-col overflow-hidden rounded-lg">
        <AutoAwesomeIcon className="mx-auto h-24 w-24 text-gray-400"/>
        <span className="mt-2 block text-lg font-semibold text-gray-900">Add an insight</span>
      </div>
      <div className="absolute bottom-4 flex w-full px-4">
      </div>
      <CreateInsightForm open={open} setOpen={setOpen} credentials={credentials} posts={posts} setPosts={setPosts}/>
      {/* <PostDetail post={post} open={open} setOpen={setOpen} setPost={setPost} /> */}
    </div>
  );
};
