'use client';

export type CredentialProps = {
  key: string;
  title: string;
  // description: string;
};

const credentialImages: { [key: string]: string } = {
  "GitHub": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSevjLMoY69RrmdOeKZONLsRySpvdkEwP-SaraZ3hc_8WFS0eR1ALIIL9xuP2_nWbRnawY&usqp=CAU",
  "Email": "data:image/png;base64,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",
};

export default function Credential({ credential }: { credential: CredentialProps }) {
  return (
    <div
      key={credential.key}
      className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
    >
      <div className="flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={credentialImages[credential.title]} alt="" />
      </div>
      <div className="min-w-0 flex-1">
        <a href="#" className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">{credential.title}</p>
          <p className="truncate text-sm text-gray-500">User has verified their {credential.title} account</p>
        </a>
      </div>
    </div>
  )
}
