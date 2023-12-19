'use client';

import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from 'lib/utils/const';
import { demos, type Item } from '#/lib/demos';
import Link from 'next/link';
import { IconPlus } from '@tabler/icons-react';
import { useSelectedLayoutSegment } from 'next/navigation';
import { MenuAlt2Icon, XIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Conversation } from 'types/chat';
import { OpenAIModels } from 'types/openai';
import { useState, useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { saveConversation, saveConversations } from 'lib/utils/conversation';
import { useCreateReducer } from 'hooks/useCreateReducer';
import { ConversationComponent } from 'ui/conversation';
import ChatbarContext from 'lib/contexts/chatbar.context';
import HomeContext from 'lib/contexts/home.context';
import { ChatbarInitialState, initialState } from 'lib/contexts/chatbar.state';

// import { v4 as uuidv4 } from 'uuid';
const uuidv4 = require('uuid').v4;

export function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  const { t } = useTranslation('sidebar');

  const chatBarContextValue = useCreateReducer<ChatbarInitialState>({
    initialState,
  });

  const {
    state: { conversations, showChatbar, defaultModelId, folders, pluginKeys },
    dispatch: homeDispatch,
    handleNewConversation,
    handleSelectConversation,
  } = useContext(HomeContext);

  const {
    state: { searchTerm, filteredConversations },
    dispatch: chatDispatch,
  } = chatBarContextValue;

  const handleDeleteConversation = (conversation: Conversation) => {
    const updatedConversations = conversations.filter(
      (c) => c.id !== conversation.id,
    );

    homeDispatch({ field: 'conversations', value: updatedConversations });
    chatDispatch({ field: 'searchTerm', value: '' });
    saveConversations(updatedConversations);

    if (updatedConversations.length > 0) {
      homeDispatch({
        field: 'selectedConversation',
        value: updatedConversations[updatedConversations.length - 1],
      });

      saveConversation(updatedConversations[updatedConversations.length - 1]);
    } else {
      defaultModelId &&
        homeDispatch({
          field: 'selectedConversation',
          value: {
            id: uuidv4(),
            name: t('New Conversation'),
            messages: [],
            model: OpenAIModels[defaultModelId],
            prompt: DEFAULT_SYSTEM_PROMPT,
            temperature: DEFAULT_TEMPERATURE,
            folderId: null,
          },
        });

      localStorage.removeItem('selectedConversation');
    }
  };

  return (
    <ChatbarContext.Provider
      value={{
        ...chatBarContextValue,
        handleDeleteConversation,
        handleClearConversations: () => null,
        handleImportConversations: () => null,
        handleExportData: () => null,
        handlePluginKeyChange: () => null,
        handleClearPluginKey: () => null,
        handleApiKeyChange: () => null,
      }}
    >
      <div className="fixed top-0 flex w-full flex-col border-b border-gray-300 bg-gray-100 lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-gray-300">
        <button
          type="button"
          className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="font-medium text-gray-100 group-hover:text-gray-400">
            Menu
          </div>
          {isOpen ? (
            <XIcon className="block w-6 text-gray-400" />
          ) : (
            <MenuAlt2Icon className="block w-6 text-gray-400" />
          )}
        </button>

        <div
          className={clsx('overflow-y-auto lg:static lg:block', {
            'fixed inset-x-0 bottom-0 top-14 mt-px bg-black': isOpen,
            hidden: !isOpen,
          })}
        >
          <nav className="space-y-6 px-2 pb-24 pt-24">
            <button
              className="text-sidebar flex w-full bg-[#343541]/90 flex-shrink-0 cursor-pointer select-none items-center gap-3 rounded-md border border-white/20 p-3 text-white transition-colors duration-200 hover:bg-[#343541]/80"
              onClick={() => {
                handleNewConversation();
              }}
            >
              <IconPlus size={16} />
              Ask a question
            </button>
            <div className="flex w-full flex-col gap-1">
              {conversations
                .filter((conversation) => !conversation.folderId)
                .slice()
                .reverse()
                .map((conversation, index) => (
                  <ConversationComponent key={index} conversation={conversation} />
                ))}
            </div>
            {demos.map((section) => {
              return (
                <div key={section.name}>
                  <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400/80">
                    <div>{section.name}</div>
                  </div>

                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <GlobalNavItem key={item.slug} item={item} close={close} handleSelectConversation={handleSelectConversation} />
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </ChatbarContext.Provider>
  );
}

function GlobalNavItem({
  item,
  close,
  handleSelectConversation,
}: {
  item: Item;
  close: () => false | void;
  handleSelectConversation: any;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = item.slug === segment;

  return (
    <Link
      onClick={() => handleSelectConversation()}
      href={`/${item.slug}`}
      className={clsx(
        'flex flex-row rounded-md px-3 py-2 text-sm font-medium hover:text-indigo-600',
        {
          'text-gray-900 hover:bg-indigo-50': !isActive,
          'text-indigo-600 bg-indigo-100': isActive,
        },
      )}
    >
      { item.name == "Documents" &&
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5H8C7 5 6 6 6 7v10c0 1 1 2 2 2h8c1 0 2-1 2-2V9l-4-4Z" clipRule="evenodd"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 15h4M10 12h1"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5v4a1 1 0 0 0 1 1h4" clipRule="evenodd"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m13.5 7.5 2 2 1-1-2-2-1 1Z"></path></svg>
      }
      { item.name == "Insights" &&
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="m17.5 15 .625 1.875L20 17.5l-1.875.625L17.5 20l-.625-1.875L15 17.5l1.875-.625zM6 17l.25.75L7 18l-.75.25L6 19l-.25-.75L5 18l.75-.25zM11 4l1.5 4.5L17 10l-4.5 1.5L11 16l-1.5-4.5L5 10l4.5-1.5z"></path></g></svg>
      }
      { item.name == "Credentials" &&
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinejoin="round"><path strokeWidth="2" d="m14.975 6.404-4.95-.707-5.657 5.657a1 1 0 0 0 0 1.414l4.243 4.242a1 1 0 0 0 1.414 0l5.657-5.656-.707-4.95Z"></path><path strokeLinecap="round" strokeWidth="2" d="m19 8.5.5 4.5-5.5 5.5"></path><path strokeLinecap="round" d="M11 9h1v1h-1z"></path></g></svg>
      }
      <span className="ml-2">
        {item.name}
      </span>
    </Link>
  );
}
