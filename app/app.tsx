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
        
        <div className="mx-auto max-w-4xl space-y-8 p-px px-2 pt-20 lg:px-12 lg:py-16">
          {children}

          {/* <div className="rounded-lg p-px">
            <div className="rounded-lg p-3.5 lg:p-6">{children}</div>
          </div> */}
          {/* <Byline className="fixed sm:hidden" /> */}
        </div>
      </div>
    </div>
  );
};