/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const util = require('util');

import { NextLogo } from '#/ui/next-logo';
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { ConnectWalletButton } from './connect-wallet-button';
import { useSSX } from './_ssx';
import { useTranslation } from 'react-i18next';
import SendIcon from '@mui/icons-material/Send';

// const user = {
//   name: 'Chelsea Hagon',
//   email: 'chelsea.hagon@example.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }
// const navigation = [
//   { name: 'Dashboard', href: '#', current: true },
//   { name: 'Calendar', href: '#', current: false },
//   { name: 'Teams', href: '#', current: false },
//   { name: 'Directory', href: '#', current: false },
// ]
// const userNavigation = [
//   { name: 'Your Profile', href: '#' },
//   { name: 'Settings', href: '#' },
//   { name: 'Sign out', href: '#' },
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

enum ModalState {
  SignIn,
  CreateVault,
  None,
}

export function Navbar() {
  const { ssx, signingIn } = useSSX();
  const { t } = useTranslation('sidebar');

  const [showSpinner, setShowSpinner] = useState(false);
  const [modalState, setModalState] = useState<ModalState>(ModalState.SignIn);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    //console.log(`ssx after sign in:\n ${util.inspect(ssx)}`)
    // console.log(`SSX KEYS: ${util.inspect(ssx?.storage.list())}`);
    //const { data } = ssx && ssx.storage.list();
    console.log(`SSX KEYS: ${util.inspect(ssx?.storage.list())}`);
    window.SSX = ssx;
  }, [signedIn]);

  const handleSignin = async () => {
    if (ssx) {    
      setShowSpinner(true);
      try {
        await ssx.signIn();
        // check if orbit exists
        const orbitExists = await (ssx?.storage as any).activateSession();
        // move to create orbit modal, if no orbit exists
        if (!orbitExists) {
          setShowSpinner(false);
          setModalState(ModalState.CreateVault);
          return;
        }
        // get or create openAI Key
        //await checkAPIKey();
      } catch (error) {
        console.error(error);
      } 
      setShowSpinner(false);
      setSignedIn(true)
    }
  };

  return (
    <>
      <div className="mx-auto fixed z-10 bg-gray-100 border-gray-300 border-b border-r-0 w-full px-6">
        <div className="flex">
          <div className="flex h-14 items-center px-4 py-4 lg:h-auto lg:w-72">
            <Link
              href="/"
              className="group flex w-full items-center gap-x-2.5"
              onClick={close}
            >
              <div className="h-7 w-7 rounded-full border border-white/30 group-hover:border-white/50">
                <NextLogo />
              </div>

              <h3 className="font-semibold tracking-wide text-gray-400 group-hover:text-gray-50">
                Sapien
              </h3>
            </Link>
          </div>
          <div className="relative flex grow justify-between lg:gap-8 lg:grid lg:grid-cols-8">
            <div className="lg:col-span-1"/>
            <div className="min-w-0 flex-1 md:px-8 lg:px-0 lg:col-span-6">
              <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                <div className="w-full">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-full border-0 bg-gray-100 py-1.5 pl-5 pr-3 h-10 text-2xl text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      placeholder="Ask a question about your data..."
                      type="search"
                    />
                    <div className="pointer-cursor absolute inset-y-0 right-0 flex items-center pr-3">
                      <SendIcon className="h-5 w-5 text-gray-400 focus:cursor-pointer focus:text-indigo-500" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
            </div>
            <div className="hidden lg:flex lg:items-center lg:justify-end lg:col-span-1">
              <ConnectWalletButton
                handleSignin={handleSignin}
                showSpinner={signingIn || showSpinner}
                ssx={ssx}
                t={t}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
