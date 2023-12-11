'use client';
import { NextLogo } from '#/ui/next-logo';
import Link from 'next/link';
import { useState } from 'react'
import { ConnectWalletButton } from './connect-wallet-button';
import { useSSX } from './_ssx';
import { useTranslation } from 'react-i18next';
import SendIcon from '@mui/icons-material/Send';

enum ModalState {
  SignIn,
  CreateVault,
  None,
}

export function TopBar() {
  const { ssx } = useSSX();
  const { t } = useTranslation('sidebar');

  const [modalState, setModalState] = useState<ModalState>(ModalState.SignIn);
  const [signedIn, setSignedIn] = useState(false);
  const [signingIn, setSigningIn] = useState(false);

  const handleSignin = async () => {
    if (ssx) {
      setSigningIn(true);  
      try {
        await ssx.signIn();
        // check if orbit exists
        const orbitExists = await (ssx?.storage as any).activateSession();
        // move to create orbit modal, if no orbit exists
        if (!orbitExists) {
          setSigningIn(false);
          setModalState(ModalState.CreateVault);
          return;
        }
        // get or create openAI Key
        //await checkAPIKey();
      } catch (error) {
        console.error(error);
      } 
      setSigningIn(false);
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
                signingIn={signingIn}
                handleSignin={handleSignin}
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
