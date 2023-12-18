//TODO: remove use client
'use client';
import '#/styles/globals.css';
import App from './app';
import { createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { SSXProvider } from '#/ui/_ssx';


const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
})

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
      </body>
    </html>
  );
}
