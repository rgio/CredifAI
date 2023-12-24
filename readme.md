# CredifAI

CredifAI is a web application that uses verifiable credentials to let experts generate claims on data which are then used to improve language model output using retreival-augmented generation. It is built with Next.js, TypeScript, and Tailwind CSS.

**Hosted Application:** https://credif-ai.vercel.app/

Credifai uses the following technologies for its core functionality:

- **Verifiable Credentials:** SpruceID (https://www.spruceid.dev/) is used to generate and verify interoperable credentials that are accessible via an Ethereum Wallet.
- **Vector Store:** ChromaDB is used to store embeddings of documents and expert generated attestations.
- **Language Model:** CredifAI integrates with the openai API for synthesis, summarization and interpretation of uploaded documents.

Credifai incorporates ChatbotUI for its chat interface (https://github.com/mckaywrigley/chatbot-ui)

## Running Locally

1. Install dependencies:

```sh
pnpm install
```

2. Start the dev server:

```sh
pnpm dev
```

## Documentation
- NextJS - https://nextjs.org/docs
- SpruceID - https://www.spruceid.dev/
- ChromaDB - https://docs.trychroma.com/
- OpenAI - https://platform.openai.com/docs/api-reference