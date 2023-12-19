'use client';
import { Chat } from 'ui/chat';
import { useRef } from 'react';

export default function Page() {
  const stopConversationRef = useRef<boolean>(false);

  return (
    <div className="h-full space-y-8 p-px pt-20 lg:py-16">
      <div className="space-y-8 mt-16 h-full w-full flex flex-col justify-end">
        <div className="space-y-20 text-white">
          <div className="relative flex grow justify-between grid grid-cols-4">
            <div className="col-span-4">
              <Chat stopConversationRef={stopConversationRef}/>
            </div>
            {/* <div className="fixed col-span-1 right-0 top-0 flex w-full flex-col border-b border-gray-300 bg-gray-100 lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-l lg:border-gray-300">
              <div className="mb-2 pt-24 text-center px-3 text-xs font-semibold uppercase tracking-wider text-gray-400/80">
                <div>Sources</div>
              </div>
              <div
                className='overflow-y-auto lg:static lg:block fixed inset-x-0 bottom-0 top-14 mt-px'
              >
                <nav className="space-y-6 px-2 pb-24 pt-24">
                  
                </nav>
              </div>
            </div> */}
          </div>
          {/* {demos.map((section) => {
            return (
              <div key={section.name} className="space-y-5">
                {/* <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {section.name}
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {section.items.map((item) => {
                    return (
                      <Link
                        href={`/${item.slug}`}
                        key={item.name}
                        className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
                      >
                        <div className="font-medium text-gray-200 group-hover:text-gray-50">
                          {item.name}
                        </div>

                        {item.description ? (
                          <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
                            {item.description}
                          </div>
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
}
