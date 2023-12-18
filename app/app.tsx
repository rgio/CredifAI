import { GlobalNav } from '#/ui/global-nav';
import { TopBar } from '#/ui/topbar';
import { SearchResults } from '#/ui/search-results';
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
      <SearchResults/>
      <div className="lg:pl-72">
        <div className="mx-auto max-w-4xl space-y-8 p-px px-2 pt-20 lg:px-12 lg:py-16">
          {children}
        </div>
      </div>
    </div>
  );
};