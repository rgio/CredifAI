'use client';
import '#/styles/globals.css';
import { AddressBar } from '#/ui/address-bar';
import Byline from '#/ui/byline';
import { GlobalNav } from '#/ui/global-nav';
import { Metadata } from 'next';
import { Navbar } from '#/ui/navbar';
import App from './app';
// import { MetaMaskProvider } from '@metamask/sdk-react';
// import { AuthProvider } from 'lib/stores/auth.store';
// import { CredentialsProvider } from 'lib/stores/credentials.store';
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { Web3Modal } from '@web3modal/react';

import { SSXProvider } from '#/ui/_ssx';


const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
})



// export const metadata: Metadata = {
//   title: {
//     default: 'Next.js App Router',
//     template: '%s | Next.js App Router',
//   },
//   description:
//     'A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.',
//   openGraph: {
//     title: 'Next.js App Router Playground',
//     description:
//       'A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.',
//     images: [`/api/og?title=Next.js App Router`],
//   },
//   twitter: {
//     card: 'summary_large_image',
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className="[color-scheme:dark]">
      <body className="bg-gray-100 overflow-y-scroll pb-36">
        <SSXProvider>
          <App>
            {children}
          </App>
        </SSXProvider>
        {/* <MetaMaskProvider debug={false} sdkOptions={{
          checkInstallationImmediately: false,
          dappMetadata: {
            name: "Sapien Truedot Demo",
            url: window.location.host,
          }
        }}>
          <AuthProvider>
            <CredentialsProvider>
              <App>
                {children}
              </App>
            </CredentialsProvider>
          </AuthProvider>
        </MetaMaskProvider> */}
      </body>
    </html>
  );
}
