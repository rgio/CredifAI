import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css'
import { useRef, useEffect } from 'react';

let connected: any; 

export const ConnectWalletButton = ({
    signingIn,
    handleSignin,
    ssx,
    t,
  }: {
    signingIn: boolean;
    handleSignin: any;
    ssx: any;
    t: any;
  }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (connected && !signingIn) {
        handleSignin();
      }
    }, [signingIn,handleSignin]);

    return (
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated');

          const sessionExists = ssx && ssx.userAuthorization && ssx.userAuthorization.session;

          return (
            <button
              type="button"
              className="ml-6 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={openConnectModal}
              disabled={signingIn}
            >
              {signingIn ? 'Connecting...' : 
              sessionExists ? ssx.userAuthorization.session.address.slice(0,8) + '...' : t('Connect')
              }
            </button>
          );
        }}
      </ConnectButton.Custom>
    );
  };