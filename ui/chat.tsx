import { IconClearAll, IconSettings } from '@tabler/icons-react';
import {
  MutableRefObject,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import toast from 'react-hot-toast';

import { useTranslation } from 'next-i18next';

import { getEndpoint } from 'lib/utils/api';
import {
  saveConversation,
  saveConversations,
  updateConversation,
} from 'lib/utils/conversation';
import { throttle } from 'lib/utils/throttle';

import { ChatBody, Conversation, Message } from 'types/chat';
import { Plugin } from 'types/plugin';

import HomeContext from '#/lib/contexts/home.context';

// import Spinner from '../Spinner';
import { ChatInput } from './chat-input';
import { ChatLoader } from './chat-loader';
// import { ErrorMessageDiv } from './ErrorMessageDiv';
// import { ModelSelect } from './ModelSelect';
// import { SystemPrompt } from './SystemPrompt';
// import { TemperatureSlider } from './Temperature';
import { MemoizedChatMessage } from './memoized-chat-message';
// import { init } from '@dqbd/tiktoken/lite/init';

interface Props {
  stopConversationRef: MutableRefObject<boolean>;
}

export const Chat = memo(({ stopConversationRef }: Props) => {
  const { t } = useTranslation('chat');

  const {
    state: {
      selectedConversation,
      conversations,
      models,
      apiKey,
      pluginKeys,
      serverSideApiKeyIsSet,
      messageIsStreaming,
      modelError,
      loading,
      prompts,
    },
    handleUpdateConversation,
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  useEffect(() => {
    const initialConversation: Conversation = {"id":"2421c854-7dea-435e-8f92-a275a8f5fef3","name":"Marketing Report Insights","messages":[{"role":"user","content":"What are the technologies marketers should be adopting and what are the challenges in adopting them?"},{"role":"assistant","content":"Based on the insights provided, we can see that experts in both the marketing and AI industries agree with the implications in the document that adoption of data-centric methods, like Artificial Intelligence (AI), will be vital for growth. A Marketing Director at Target plans to invest heavily in data-centric methodologies through hiring and internal training programs, indicating challenges might stem from the need for new skillsets and knowledge within an organization. \\n\\nAdditionally, an AI researcher at Google suggests that industries, including marketing, will significantly benefit from AI and that there are opportunities to integrate technologies like Language Learning Models (LLMs) into existing marketing departments. This suggests that the challenges in technology adoption might be overcome by convenience provided by AI's like ChatGPT that can act as a data scientist, thus minimizing the challenges of diving into data science details or hiring competent data scientists.\\n\\nRelated Insights:\\n* Wide adoption of data-centric methods, like AI, are key for growth in the marketing industry, implying challenges could arise from the need for new skillsets and knowledge (Source: Marketing Director @ Target) \\n* Opportunities exist to integrate technologies like Language Learning Models into existing marketing departments, which can minimize challenges in technology adoption (Source: AI Researcher @ Google)"}],"model":{"id":"gpt-3.5-turbo","name":"GPT-3.5","maxLength":12000,"tokenLimit":4000},"prompt":"You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.","temperature":1,"folderId":null};
    saveConversation(initialConversation);
    homeDispatch({
      field: 'selectedConversation',
      value: initialConversation,
    });
    const updatedConversations: Conversation[] = [initialConversation];
    homeDispatch({ field: 'conversations', value: updatedConversations });
    saveConversations(updatedConversations);
    homeDispatch({ field: 'messageIsStreaming', value: false });
  }, []);


  const [currentMessage, setCurrentMessage] = useState<Message>();
  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showScrollDownButton, setShowScrollDownButton] =
    useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(
    async (message: Message, deleteCount = 0, plugin: Plugin | null = null) => {
      console.log(`handleSend: ${JSON.stringify(message)}`);
      // console.log(`selectedConversation: ${JSON.stringify(selectedConversation)}`)
      if (selectedConversation) {
        // console.log(`IN SELECTED CONVERSATION`);
        
        let updatedConversation: Conversation;
        if (deleteCount) {
          const updatedMessages = [...selectedConversation.messages];
          for (let i = 0; i < deleteCount; i++) {
            updatedMessages.pop();
          }
          updatedConversation = {
            ...selectedConversation,
            messages: [...updatedMessages, message],
          };
        } else {
          updatedConversation = {
            ...selectedConversation,
            messages: [...selectedConversation.messages, message],
          };
        }
        homeDispatch({
          field: 'selectedConversation',
          value: updatedConversation,
        });
        homeDispatch({ field: 'loading', value: true });
        homeDispatch({ field: 'messageIsStreaming', value: true });
        const chatBody: ChatBody = {
          model: updatedConversation.model,
          messages: updatedConversation.messages,
          key: apiKey,
          prompt: updatedConversation.prompt,
          temperature: updatedConversation.temperature,
        };
        const endpoint = getEndpoint(plugin);
        //const endpoint = 'http://localhost:3001/api/chat'
        // console.log(`ENDPOINT is: ${JSON.stringify(endpoint)}`)
        let body = '';
        if (!plugin) {
          body = JSON.stringify(chatBody);
        } else {
          body = JSON.stringify({
            ...chatBody,
            googleAPIKey: pluginKeys
              .find((key) => key.pluginId === 'google-search')
              ?.requiredKeys.find((key) => key.key === 'GOOGLE_API_KEY')?.value,
            googleCSEId: pluginKeys
              .find((key) => key.pluginId === 'google-search')
              ?.requiredKeys.find((key) => key.key === 'GOOGLE_CSE_ID')?.value,
          });
        }
        // console.log(`BODY: ${JSON.stringify(body)}`);
        const controller = new AbortController();
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
          body,
        });
        const json = await response.json();
        console.log(`RESPONSE IS: ${JSON.stringify(json)}`);
        const text = json.data;
        if (!text) {
          console.log(`no response`);
          homeDispatch({ field: 'loading', value: false });
          homeDispatch({ field: 'messageIsStreaming', value: false });
          return;
        }
        console.log(`TEXT IS: ${JSON.stringify(text)}`)

        homeDispatch({ field: 'loading', value: false });
        homeDispatch({ field: 'messageIsStreaming', value: false });

        let updatedMessages: Message[] = [
          ...updatedConversation.messages,
          { role: 'assistant', content: text },
        ];
        updatedConversation = {
          ...updatedConversation,
          messages: updatedMessages,
        };
        homeDispatch({
          field: 'selectedConversation',
          value: updatedConversation,
        });

        // updatedMessages =
        // updatedConversation.messages.map((message, index) => {
        //   if (index === updatedConversation.messages.length - 1) {
        //     return {
        //       ...message,
        //       content: body,
        //     };
        //   }
        //   return message;
        // });
        // updatedConversation = {
        //   ...updatedConversation,
        //   messages: updatedMessages,
        // };
        // homeDispatch({
        //   field: 'selectedConversation',
        //   value: updatedConversation,
        // });

        saveConversation(updatedConversation);
        const updatedConversations: Conversation[] = conversations.map(
          (conversation) => {
            if (conversation.id === selectedConversation.id) {
              return updatedConversation;
            }
            return conversation;
          },
        );
        if (updatedConversations.length === 0) {
          updatedConversations.push(updatedConversation);
        }
        homeDispatch({ field: 'conversations', value: updatedConversations });
        saveConversations(updatedConversations);
        homeDispatch({ field: 'messageIsStreaming', value: false });

        return;
        // if (!response.ok) {
        //   console.log(`response not ok: ${JSON.stringify(response)}`);
        //   homeDispatch({ field: 'loading', value: false });
        //   homeDispatch({ field: 'messageIsStreaming', value: false });
        //   toast.error(response.statusText);
        //   return;
        // }
        // //const data = response.body;
        // if (!data) {
        //   console.log(`no data: ${JSON.stringify(data)}`);
        //   homeDispatch({ field: 'loading', value: false });
        //   homeDispatch({ field: 'messageIsStreaming', value: false });
        //   return;
        // }
        // if (!plugin) {
        //   if (updatedConversation.messages.length === 1) {
        //     const { content } = message;
        //     const customName =
        //       content.length > 30 ? content.substring(0, 30) + '...' : content;
        //     updatedConversation = {
        //       ...updatedConversation,
        //       name: customName,
        //     };
        //   }
        //   homeDispatch({ field: 'loading', value: false });
        //   const reader = data.getReader();
        //   const decoder = new TextDecoder();
        //   let done = false;
        //   let isFirst = true;
        //   let text = '';
        //   while (!done) {
        //     if (stopConversationRef.current === true) {
        //       controller.abort();
        //       done = true;
        //       break;
        //     }
        //     const { value, done: doneReading } = await reader.read();
        //     done = doneReading;
        //     const chunkValue = decoder.decode(value);
        //     text += chunkValue;
        //     if (isFirst) {
        //       isFirst = false;
        //       const updatedMessages: Message[] = [
        //         ...updatedConversation.messages,
        //         { role: 'assistant', content: chunkValue },
        //       ];
        //       updatedConversation = {
        //         ...updatedConversation,
        //         messages: updatedMessages,
        //       };
        //       homeDispatch({
        //         field: 'selectedConversation',
        //         value: updatedConversation,
        //       });
        //     } else {
        //       const updatedMessages: Message[] =
        //         updatedConversation.messages.map((message, index) => {
        //           if (index === updatedConversation.messages.length - 1) {
        //             return {
        //               ...message,
        //               content: text,
        //             };
        //           }
        //           return message;
        //         });
        //       updatedConversation = {
        //         ...updatedConversation,
        //         messages: updatedMessages,
        //       };
        //       homeDispatch({
        //         field: 'selectedConversation',
        //         value: updatedConversation,
        //       });
        //     }
        //   }

        //   saveConversation(updatedConversation);
        //   const updatedConversations: Conversation[] = conversations.map(
        //     (conversation) => {
        //       if (conversation.id === selectedConversation.id) {
        //         return updatedConversation;
        //       }
        //       return conversation;
        //     },
        //   );
        //   if (updatedConversations.length === 0) {
        //     updatedConversations.push(updatedConversation);
        //   }
        //   homeDispatch({ field: 'conversations', value: updatedConversations });
        //   saveConversations(updatedConversations);
        //   homeDispatch({ field: 'messageIsStreaming', value: false });
        // } else {
        //   const { answer } = await response.json();
        //   const updatedMessages: Message[] = [
        //     ...updatedConversation.messages,
        //     { role: 'assistant', content: answer },
        //   ];
        //   updatedConversation = {
        //     ...updatedConversation,
        //     messages: updatedMessages,
        //   };
        //   homeDispatch({
        //     field: 'selectedConversation',
        //     value: updateConversation,
        //   });
        //   saveConversation(updatedConversation);
        //   const updatedConversations: Conversation[] = conversations.map(
        //     (conversation) => {
        //       if (conversation.id === selectedConversation.id) {
        //         return updatedConversation;
        //       }
        //       return conversation;
        //     },
        //   );
        //   if (updatedConversations.length === 0) {
        //     updatedConversations.push(updatedConversation);
        //   }
        //   homeDispatch({ field: 'conversations', value: updatedConversations });
        //   saveConversations(updatedConversations);
        //   homeDispatch({ field: 'loading', value: false });
        //   homeDispatch({ field: 'messageIsStreaming', value: false });
        // }
      }
    },
    [
      apiKey,
      conversations,
      pluginKeys,
      selectedConversation,
      stopConversationRef,
    ],
  );

  const scrollToBottom = useCallback(() => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      textareaRef.current?.focus();
    }
  }, [autoScrollEnabled]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const bottomTolerance = 30;

      if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
        setAutoScrollEnabled(false);
        setShowScrollDownButton(true);
      } else {
        setAutoScrollEnabled(true);
        setShowScrollDownButton(false);
      }
    }
  };

  const handleScrollDown = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleSettings = () => {
    setShowSettings(!showSettings);
  };

  // const onClearAll = () => {
  //   if (
  //     confirm(t<string>('Are you sure you want to clear all messages?')) &&
  //     selectedConversation
  //   ) {
  //     handleUpdateConversation(selectedConversation, {
  //       key: 'messages',
  //       value: [],
  //     });
  //   }
  // };

  const scrollDown = () => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView(true);
    }
  };
  const throttledScrollDown = throttle(scrollDown, 250);

  // useEffect(() => {
  //   console.log('currentMessage', currentMessage);
  //   if (currentMessage) {
  //     handleSend(currentMessage);
  //     homeDispatch({ field: 'currentMessage', value: undefined });
  //   }
  // }, [currentMessage]);

  useEffect(() => {
    throttledScrollDown();
    selectedConversation &&
      setCurrentMessage(
        selectedConversation.messages[selectedConversation.messages.length - 2],
      );
  }, [selectedConversation, throttledScrollDown]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAutoScrollEnabled(entry.isIntersecting);
        if (entry.isIntersecting) {
          textareaRef.current?.focus();
        }
      },
      {
        root: null,
        threshold: 0.5,
      },
    );
    const messagesEndElement = messagesEndRef.current;
    if (messagesEndElement) {
      observer.observe(messagesEndElement);
    }
    return () => {
      if (messagesEndElement) {
        observer.unobserve(messagesEndElement);
      }
    };
  }, [messagesEndRef]);

  return (
    <div className="relative flex-1 overflow-hidden bg-white dark:bg-[#343541]">
      {!(true) ? (
        <div className="mx-auto flex h-full w-[300px] flex-col justify-center space-y-6 sm:w-[600px]">
          <div className="text-center text-4xl font-bold text-black dark:text-white">
            Welcome to Chatbot UI
          </div>
          <div className="text-center text-lg text-black dark:text-white">
            <div className="mb-8">{`Chatbot UI is an open source clone of OpenAI's ChatGPT UI.`}</div>
            <div className="mb-2 font-bold">
              Important: Chatbot UI is 100% unaffiliated with OpenAI.
            </div>
          </div>
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="mb-2">
              Chatbot UI allows you to plug in your API key to use this UI with
              their API.
            </div>
            <div className="mb-2">
              It is <span className="italic">only</span> used to communicate
              with their API.
            </div>
            <div className="mb-2">
              {t(
                'Please set your OpenAI API key in the bottom left of the sidebar.',
              )}
            </div>
            <div>
              {t("If you don't have an OpenAI API key, you can get one here: ")}
              <a
                href="https://platform.openai.com/account/api-keys"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                openai.com
              </a>
            </div>
          </div>
        </div>
      ) : modelError ? (
        // <ErrorMessageDiv error={modelError} />
        <div>error</div>
      ) : (
        <>
          <div
            className="max-h-full overflow-x-hidden overflow-y-scroll"
            ref={chatContainerRef}
            onScroll={handleScroll}
          >
            {selectedConversation?.messages.length === 0 ? (
              <>
                <div className="mx-auto flex flex-col space-y-5 md:space-y-10 px-3 pt-5 md:pt-12 sm:max-w-[600px]">
                  <div className="text-center text-3xl font-semibold text-gray-800 dark:text-gray-100">
                    Chatbot UI
                    {/* {models.length === 0 ? (
                      <div>
                        <Spinner size="16px" className="mx-auto" />
                      </div>
                    ) : (
                      'Chatbot UI'
                    )} */}
                  </div>

                  {models.length > 0 && (
                    <div className="flex h-full flex-col space-y-4 rounded-lg border border-neutral-200 p-4 dark:border-neutral-600">
                      {/* <ModelSelect /> */}
                      <div>Select Model</div>

                      {/* <SystemPrompt
                        conversation={selectedConversation}
                        prompts={prompts}
                        onChangePrompt={(prompt) =>
                          handleUpdateConversation(selectedConversation, {
                            key: 'prompt',
                            value: prompt,
                          })
                        }
                      /> */}
                      <div>System Prompt</div>

                      {/* <TemperatureSlider
                        label={t('Temperature')}
                        onChangeTemperature={(temperature) =>
                          handleUpdateConversation(selectedConversation, {
                            key: 'temperature',
                            value: temperature,
                          })
                        }
                      /> */}
                      <div>Temperature Slider</div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* <div className="sticky top-0 z-10 flex justify-center border border-b-neutral-300 bg-neutral-100 py-2 text-sm text-neutral-500 dark:border-none dark:bg-[#444654] dark:text-neutral-200">
                  {t('Model')}: {selectedConversation?.model.name} | {t('Temp')}
                  : {selectedConversation?.temperature} |
                  <button
                    className="ml-2 cursor-pointer hover:opacity-50"
                    onClick={handleSettings}
                  >
                    <IconSettings size={18} />
                  </button>
                  <button
                    className="ml-2 cursor-pointer hover:opacity-50"
                    onClick={onClearAll}
                  >
                    <IconClearAll size={18} />
                  </button>
                </div> */}
                {showSettings && (
                  <div className="flex flex-col space-y-10 md:mx-auto md:max-w-xl md:gap-6 md:py-3 md:pt-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
                    <div className="flex h-full flex-col space-y-4 border-b border-neutral-200 p-4 dark:border-neutral-600 md:rounded-lg md:border">
                      {/* <ModelSelect /> */}
                      <div>Select Model</div>
                    </div>
                  </div>
                )}

                {selectedConversation?.messages.map((message, index) => (
                  <MemoizedChatMessage
                    key={index}
                    message={message}
                    messageIndex={index}
                    onEdit={(editedMessage) => {
                      setCurrentMessage(editedMessage);
                      // discard edited message and the ones that come after then resend
                      handleSend(
                        editedMessage,
                        selectedConversation?.messages.length - index,
                      );
                    }}
                  />
                ))}

                {loading && <ChatLoader />}

                <div
                  className="h-[162px] bg-gray-100 dark:bg-[#343541]"
                  ref={messagesEndRef}
                />
              </>
            )}
          </div>

          <ChatInput
            stopConversationRef={stopConversationRef}
            textareaRef={textareaRef}
            onSend={(message, plugin) => {
              setCurrentMessage(message);
              handleSend(message, 0, plugin);
            }}
            onScrollDownClick={handleScrollDown}
            onRegenerate={() => {
              if (currentMessage) {
                handleSend(currentMessage, 2, null);
              }
            }}
            showScrollDownButton={showScrollDownButton}
          />
        </>
      )}
    </div>
  );
});
Chat.displayName = 'Chat';
