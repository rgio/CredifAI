import { GlobalNav } from '#/ui/global-nav';
import { TopBar } from '#/ui/topbar';
import React from 'react';
import { Toaster } from "react-hot-toast";

export default function App({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="App">
      <TopBar/>
      <GlobalNav/>
      <div className="lg:pl-72 min-h-screen">
        <Toaster position="bottom-left" />
        {children}
      </div>

    </div>
  );
};