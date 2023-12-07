import { GlobalNav } from '#/ui/global-nav';
import { Navbar } from '#/ui/navbar';
import React, { useState } from 'react';

export default function App({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="App">
      <Navbar/>
      <GlobalNav/>
      <div className="lg:pl-72">
        
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