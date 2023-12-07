import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css'
import { useEffect } from 'react';


export const ConnectWalletButton = ({
    handleSignin,
    showSpinner,
    ssx,
    t,
  }: {
    handleSignin: any;
    showSpinner: boolean;
    ssx: any;
    t: any;
  }) => {


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
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated');

          const sessionExists = ssx && ssx.userAuthorization && ssx.userAuthorization.session;

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (connected && !chain.unsupported) {
                  handleSignin();
                }

                return (
                  <button
                    type="button"
                    className="ml-6 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={openConnectModal}
                    disabled={showSpinner}
                  >
                    {showSpinner ? 'Connecting...' : 
                    sessionExists ? ssx.userAuthorization.session.address.slice(0,8) + '...' : t('Connect')
                    }
                  </button>
                );
                // if (!connected) {
                //   return (
                //     <button
                //       type="button"
                //       className="ml-6 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                //       onClick={openConnectModal}
                //       disabled={showSpinner}
                //     >
                //       {showSpinner ? 'Connecting...' : t('Connect')}
                //     </button>
                //   );
                // }
                // if (chain.unsupported) {
                //   return (
                //     <button onClick={openChainModal} type="button">
                //       Wrong network
                //     </button>
                //   );
                // }
                // return (
                //   <div style={{ display: 'flex', gap: 12 }}>
                //     <button
                //       type="button"
                //       className="mt-6 w-full rounded-lg border border-neutral-500 px-4 py-2 text-neutral-900 shadow hover:bg-neutral-100 focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-300"
                //       onClick={() => { handleSignin(); }}
                //       disabled={showSpinner}
                //     >
                //       {showSpinner ? 'Signing in with SSX...' : t('Sign-In')}
                //     </button>
                //   </div>
                // );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    );
  };