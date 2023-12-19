import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from 'lib/utils/const';
import { OpenAIError, OpenAIStream } from 'lib/utils/server';

import { ChatBody, Message } from 'types/chat';

// @ts-expect-error
import wasm from '../../node_modules/@dqbd/tiktoken/lite/tiktoken_bg.wasm?module';

import tiktokenModel from 'node_modules/@dqbd/tiktoken/encoders/cl100k_base.json';
import { Tiktoken, init } from 'node_modules/@dqbd/tiktoken/lite/init';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    //const body = JSON.parse("{\"model\":{\"id\":\"gpt-3.5-turbo\",\"name\":\"GPT-3.5\",\"maxLength\":12000,\"tokenLimit\":4000},\"messages\":[{\"role\":\"user\",\"content\":\"hey there how are you\"},{\"role\":\"assistant\",\"content\":\"Hello! As an AI language model, I don't have feelings or emotions, but I'm here and ready to assist you. How can I help you\"},{\"role\":\"user\",\"content\":\"thanks im doing good\"},{\"role\":\"assistant\",\"content\":\"That's great to hear! If there's anything specific you'd like to discuss or any questions you have, feel free to let me know and I'll do my best to assist you.\"},{\"role\":\"user\",\"content\":\"howdy there partner\"},{\"role\":\"assistant\",\"content\":\"Howdy! How can I assist you today, partner?\"},{\"role\":\"user\",\"content\":\"yall know much bout wranglin\"},{\"role\":\"assistant\",\"content\":\"Well, as an AI language model, I possess a vast amount of knowledge on various subjects, including wrangling. Wrangling typically refers to the skill of managing or handling livestock, particularly horses or cattle. If you have any specific questions or topics related to wrangling, feel free to ask, and I'll do my best to provide you with the information you\"},{\"role\":\"user\",\"content\":\"thats awful nifty\"},{\"role\":\"assistant\",\"content\":\"Thank you! I'm glad you find it nifty. Wrangling is indeed a valuable skill for those working with livestock. It involves tasks such as herding, roping, branding, and other techniques used to handle and care for animals. If you have any particular inquiries or need information on a specific aspect of wrangling, please let me know. I'm here to help!\"},{\"role\":\"user\",\"content\":\"aww ya\"},{\"role\":\"assistant\",\"content\":\"I'm here to assist you, so please let me know if there's anything specific you'd like to know or discuss about wrangling, or any other topic you're interested in.\"},{\"role\":\"user\",\"content\":\"how does this work\"}],\"key\":\"\",\"prompt\":\"You are ChatGPT, a large language model trained by OpenAI. Follow the user\'s instructions carefully. Respond using markdown.\",\"temperature\":1}") as ChatBody;
    const body = await req.json() as ChatBody;
    const { model, messages, key, prompt, temperature } = body;
    console.log(`BODY IS: ${JSON.stringify(body)}`);

    const path = 'test.pdf';
    const embeddingEndpoint = 'http://localhost:5000/chat_document'; // Replace [FLASK_SERVER_URL] with your Flask server's URL
    const embeddingResponse = await fetch(embeddingEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        document_path: path,
        initial_prompt: messages[messages.length-1].content,
      })
    });
    const json = await embeddingResponse.json();
    console.log(`DATA IS: ${JSON.stringify(json)}`);
    return new Response(JSON.stringify({data : json.response }), { status: 200 });
    // const { model, messages, prompt, temperature } = (await req.json()) as ChatBody;
    //const key = process.env.OPENAI_API_KEY
    // const key = "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";
    // console.log(`KEY IS: ${key}`);

    // await init((imports) => WebAssembly.instantiate(wasm, imports));
    // const encoding = new Tiktoken(
    //   tiktokenModel.bpe_ranks,
    //   tiktokenModel.special_tokens,
    //   tiktokenModel.pat_str,
    // );

    // let promptToSend = prompt;
    // if (!promptToSend) {
    //   promptToSend = DEFAULT_SYSTEM_PROMPT;
    // }

    // let temperatureToUse = temperature;
    // if (temperatureToUse == null) {
    //   temperatureToUse = DEFAULT_TEMPERATURE;
    // }

    // const prompt_tokens = encoding.encode(promptToSend);

    // let tokenCount = prompt_tokens.length;
    // let messagesToSend: Message[] = [];

    // for (let i = messages.length - 1; i >= 0; i--) {
    //   const message = messages[i];
    //   const tokens = encoding.encode(message.content);

    //   if (tokenCount + tokens.length + 1000 > model.tokenLimit) {
    //     break;
    //   }
    //   tokenCount += tokens.length;
    //   messagesToSend = [message, ...messagesToSend];
    // }

    // encoding.free();

    // const stream = await OpenAIStream(model, promptToSend, temperatureToUse, key!, messagesToSend);

    // return new Response(stream);
  } catch (error) {
    console.error(error);
    if (error instanceof OpenAIError) {
      return new Response('Error', { status: 500, statusText: error.message });
    } else {
      return new Response('Error', { status: 500 });
    }
  }
};

export default handler;
