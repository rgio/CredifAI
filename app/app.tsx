import { GlobalNav } from '#/ui/global-nav';
import { TopBar } from '#/ui/topbar';
import React from 'react';

export default function App({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="App">
      <TopBar/>
      <GlobalNav/>
      <div className="lg:pl-72 h-screen">
        {children}
      </div>
    </div>
  );
};