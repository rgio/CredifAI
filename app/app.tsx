import { useSDK } from '@metamask/sdk-react';
import { GlobalNav } from '#/ui/global-nav';
import { Navbar } from '#/ui/navbar';
import React, { useState } from 'react';

export default function App({
  children,
}: {
  children: React.ReactNode;
}) {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connectAccount = async () => {
    try {
      const accounts: any = await sdk?.connect();
      setAccount(accounts?.[0]);
      console.log(`connected to ${accounts?.[0]}`);
    } catch(err) {
      console.warn(`failed to connect..`, err);
    }
  };

  return (
    <div className="App">
      <GlobalNav />

      <div className="lg:pl-72">
        <Navbar
          account={account}
          connectAccount={connectAccount}
        />
        <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
          {/* <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20">
            <div className="rounded-lg bg-black">
              <AddressBar />
            </div>
          </div> */}

          <div className="rounded-lg p-px">
            <div className="rounded-lg p-3.5 lg:p-6">{children}</div>
          </div>
          {/* <Byline className="fixed sm:hidden" /> */}
        </div>
      </div>
    </div>
  );
};