//TODO: remove use client
'use client';
import '#/styles/globals.css';
import App from './app';
import { createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { SSXProvider } from '#/ui/_ssx';
import { demos } from '#/lib/demos';
import Link from 'next/link';
import { Chat } from 'ui/chat';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import HomeContext from 'lib/contexts/home.context';
import { HomeInitialState, initialState } from 'lib/contexts/home.state';
import { useCreateReducer } from 'hooks/useCreateReducer';
import { useTranslation } from 'next-i18next';

import { Conversation } from 'types/chat';
import { KeyValuePair } from 'types/data';
import { OpenAIModelID, OpenAIModels, fallbackModelID } from 'types/openai';
import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from 'lib/utils/const';
import {
  saveConversation,
  saveConversations,
  updateConversation,
} from 'lib/utils/conversation';
import {
  cleanConversationHistory,
  cleanSelectedConversation,
} from 'lib/utils/clean';
import { GlobalNav } from 'ui/global-nav';

//import { v4 as uuidv4 } from 'uuid';
const uuidv4 = require('uuid').v4;


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
  const router = useRouter();
  const defaultModelId = fallbackModelID;

  const { t } = useTranslation('chat');

  const stopConversationRef = useRef<boolean>(false);

  const contextValue = useCreateReducer<HomeInitialState>({
    initialState,
  });

  const {
    state: {
      apiKey,
      lightMode,
      folders,
      conversations,
      selectedConversation,
      prompts,
      temperature,
    },
    dispatch,
  } = contextValue;

  const handleNewConversation = () => {
    router.push('/', { scroll: false })
    const lastConversation = conversations[conversations.length - 1];

    const newConversation: Conversation = {
      id: uuidv4(),
      name: t(`Conversation ${conversations.length + 1}`),
      messages: [],
      model: lastConversation?.model || {
        id: OpenAIModels[defaultModelId].id,
        name: OpenAIModels[defaultModelId].name,
        maxLength: OpenAIModels[defaultModelId].maxLength,
        tokenLimit: OpenAIModels[defaultModelId].tokenLimit,
      },
      prompt: DEFAULT_SYSTEM_PROMPT,
      temperature: lastConversation?.temperature ?? DEFAULT_TEMPERATURE,
      folderId: null,
    };

    const updatedConversations = [...conversations, newConversation];

    dispatch({ field: 'selectedConversation', value: newConversation });
    dispatch({ field: 'conversations', value: updatedConversations });

    saveConversation(newConversation);
    saveConversations(updatedConversations);

    dispatch({ field: 'loading', value: false });
  };

  // useEffect(() => {
  //   handleNewConversation();
  // }, []);

  // ON LOAD
  useEffect(() => {
    const conversationHistory = localStorage.getItem('conversationHistory');
    if (conversationHistory) {
      const parsedConversationHistory: Conversation[] =
        JSON.parse(conversationHistory);
      const cleanedConversationHistory = cleanConversationHistory(
        parsedConversationHistory,
      );

      dispatch({ field: 'conversations', value: cleanedConversationHistory });
    }

    const selectedConversation = localStorage.getItem('selectedConversation');
    if (selectedConversation && selectedConversation !== 'undefined') {
      const parsedSelectedConversation: Conversation =
        JSON.parse(selectedConversation);
      const cleanedSelectedConversation = cleanSelectedConversation(
        parsedSelectedConversation,
      );

      dispatch({
        field: 'selectedConversation',
        value: cleanedSelectedConversation,
      });
    } else {
      const lastConversation = conversations[conversations.length - 1];
      dispatch({
        field: 'selectedConversation',
        value: {
          id: uuidv4(),
          name: t('New Conversation'),
          messages: [],
          model: OpenAIModels[defaultModelId],
          prompt: DEFAULT_SYSTEM_PROMPT,
          temperature: lastConversation?.temperature ?? DEFAULT_TEMPERATURE,
          folderId: null,
        },
      });
    }
  }, []);

  const handleSelectConversation = (conversation: Conversation) => {
    router.push('/', { scroll: false })
    dispatch({
      field: 'selectedConversation',
      value: conversation,
    });

    saveConversation(conversation);
  };

  const handleUpdateConversation = (
    conversation: Conversation,
    data: KeyValuePair,
  ) => {
    const updatedConversation = {
      ...conversation,
      [data.key]: data.value,
    };

    const { single, all } = updateConversation(
      updatedConversation,
      conversations,
    );

    dispatch({ field: 'selectedConversation', value: single });
    dispatch({ field: 'conversations', value: all });
  };


  return (
    <html lang="en" className="[color-scheme:dark]">
      <body className="bg-gray-100 overflow-y-scroll pb-20">
        <SSXProvider>
          <HomeContext.Provider
            value={{
              ...contextValue,
              handleNewConversation,
              handleCreateFolder: () => null,
              handleDeleteFolder: () => null,
              handleUpdateFolder: () => null,
              handleSelectConversation,
              handleUpdateConversation,
            }}
          >
            <App>
              {children}
            </App>
          </HomeContext.Provider>
        </SSXProvider>
      </body>
    </html>
  );
}
