// 'use client';

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { toCredentialEntry, Signer } from 'lib/utils/rebase';
// import { Client, defaultClientConfig, type Types } from '@spruceid/rebase-client';
// import { WasmClient } from '@spruceid/rebase-client/wasm';
// // import { writable, type Writable } from 'svelte/store';
// // import { _myList, _reviews, myList, reviews } from './book.store';
// // import { _ssx } from './auth.store';
// import { useAuth } from './auth.store';
// // import { fetchMyUserFollowingHandles } from './users.store';
// import type { AttestationProof, AttestationStatement } from '@spruceid/rebase-client/bindings';

// /* GENERAL */
// export const REBASE_URL_BASE = 'https://rebasedemo.spruceid.workers.dev';

// /* REBASE */
// const rebaseClient = new Client(new WasmClient(JSON.stringify(defaultClientConfig())));

// const initialState = {};

// const CredentialsContext = createContext(initialState);

// export const useCredentials = () => {
//   const context = useContext(CredentialsContext);
//   if (!context) {
//     throw new Error('useCredentials must be used within a CredentialsProvider');
//   }
//   return context;
// };

// export const CredentialsProvider = ({ children }) => {
//   // const [rebaseClient, setRebaseClient] = useState(new Client(new WasmClient(JSON.stringify(defaultClientConfig()))));
//   // const [rebaseClient, setRebaseClient] = useState<any>(null);
//   const [signer, setSigner] = useState(null);

//   const { ssx } = useAuth();

//   const sanityCheck = () => {
//     if (!rebaseClient) {
//       throw new Error('Rebase client is not configured');
//     }

//     if (!signer) {
//       throw new Error('Signer is not connected');
//     }
//   }

//   const statement = async (t: Types.AttestationTypes, content: any): Promise<string> => {
//     sanityCheck();
//     const o = {};
//     (o as any)[t] = Object.assign({ subject: await signer?.toSubject() }, content);
//     const req: Types.Statements = {
//       Attestation: o as AttestationStatement
//     };
  
//     const resp = await rebaseClient?.statement(req);
//     if (!resp?.statement) {
//       // TODO: Check for .error?
//       throw new Error('No statement found in witness response');
//     }
  
//     // NOTE: We ignore the delimiter param because no cred in this example uses it.
//     return resp.statement;
//   };

//   const witness = async (
//     t: Types.AttestationTypes,
//     content: any,
//     signature: string
//   ): Promise<string> => {
//     sanityCheck();
  
//     const o = {};
//     (o as any)[t] = {
//       signature,
//       statement: Object.assign({ subject: await signer?.toSubject() }, content)
//     };
  
//     const req: Types.Proofs = {
//       Attestation: o as AttestationProof
//     };
  
//     // TODO: JSON Schema validation here:
//     const resp = await rebaseClient?.witness_jwt(req);
//     if (!resp?.jwt) {
//       // TODO: Check for .error?
//       throw new Error('No jwt found in witness response');
//     }
  
//     return resp.jwt;
//   };

//   const issue = async (credentialType: Types.AttestationTypes, content: any) => {
//     const stmt = await statement(credentialType, content);
//     const sig = (await signer?.sign(stmt)) ?? '';
//     const jwt_str = await witness(credentialType, content, sig);
//     addCredential(jwt_str);
//   };
  
//   const uploadToKepler = async (path: string, credential: string): Promise<any> => {
//     return ssx?.storage.put(`joyce/${path}`, credential);
//   };

//   const addCredential = async (jwt_str: string): Promise<void> => {
//     const entry = toCredentialEntry(jwt_str);
//     let insightId;
//     switch (entry.content.type) {
//       case 'InsightAttestation':
//         //insightId = entry.content.link.split('/').pop() ?? '';
//         insightId = 1;
//         await uploadToKepler(`public/${entry.content.type}/${insightId}`, jwt_str);
//         return;
//     }
//   };

//   return (
//     <CredentialsContext.Provider
//       value={{
//         issue,
//         rebaseClient,
//         setRebaseClient,
//         signer,
//         setSigner,
//       }}
//     >
//       {children}
//     </CredentialsContext.Provider>
//   );
// };

// // export const rebaseClient: Writable<Client | null> = writable(null);
// // rebaseClient.set(new Client(new WasmClient(JSON.stringify(defaultClientConfig()))));

// // export const addCredential = async (jwt_str: string): Promise<void> => {
// //   const entry = toCredentialEntry(jwt_str);
// //   let insightId;
// //   switch (entry.content.type) {
// //     case 'InsightAttestation':
// //       //insightId = entry.content.link.split('/').pop() ?? '';
// //       insightId = 1;
// //       await uploadToKepler(`public/${entry.content.type}/${insightId}`, jwt_str);
// //       return;
// //   }
// // };

// /* WITNESS */
// // let _rebaseClient: Client | null;
// // rebaseClient.subscribe((x) => (_rebaseClient = x));

// // export const signer: Writable<Signer | null> = writable(null);
// // let _signer: Signer | null;
// // signer.subscribe((x) => (_signer = x));

// // const sanityCheck = () => {
// //   if (!_rebaseClient) {
// //     throw new Error('Rebase client is not configured');
// //   }

// //   if (!_signer) {
// //     throw new Error('Signer is not connected');
// //   }
// // };

// // NOTE: This could be done with much better typing
// // but will wait for the bindings generation to bother with it.
// // export const statement = async (t: Types.AttestationTypes, content: any): Promise<string> => {
// //   sanityCheck();
// //   const o = {};
// //   (o as any)[t] = Object.assign({ subject: await _signer?.toSubject() }, content);
// //   const req: Types.Statements = {
// //     Attestation: o as AttestationStatement
// //   };

// //   const resp = await _rebaseClient?.statement(req);
// //   if (!resp?.statement) {
// //     // TODO: Check for .error?
// //     throw new Error('No statement found in witness response');
// //   }

// //   // NOTE: We ignore the delimiter param because no cred in this example uses it.
// //   return resp.statement;
// // };

// // NOTE: This could be done with much better typing
// // but will wait for the bindings generation to bother with it.
// // export const witness = async (
// //   t: Types.AttestationTypes,
// //   content: any,
// //   signature: string
// // ): Promise<string> => {
// //   sanityCheck();

// //   const o = {};
// //   (o as any)[t] = {
// //     signature,
// //     statement: Object.assign({ subject: await _signer?.toSubject() }, content)
// //   };

// //   const req: Types.Proofs = {
// //     Attestation: o as AttestationProof
// //   };

// //   // TODO: JSON Schema validation here:
// //   const resp = await _rebaseClient?.witness_jwt(req);
// //   if (!resp?.jwt) {
// //     // TODO: Check for .error?
// //     throw new Error('No jwt found in witness response');
// //   }

// //   return resp.jwt;
// // };

// // NOTE: This could be done with much better typing
// // but will wait for the bindings generation to bother with it.
// // export const issue = async (credentialType: Types.AttestationTypes, content: any) => {
// //   const stmt = await statement(credentialType, content);
// //   const sig = (await _signer?.sign(stmt)) ?? '';
// //   const jwt_str = await witness(credentialType, content, sig);
// //   addCredential(jwt_str);
// // };

// // export const listKeplerFiles = async (): Promise<any> => {
// //   const response = await _ssx?.storage.list();
// //   return response?.data;
// // };

// // export const uploadToKepler = async (path: string, credential: string): Promise<any> => {
// //   return _ssx?.storage.put(`joyce/${path}`, credential);
// // };

// // export const getFromKepler = async (path: string): Promise<any> => {
// //   const response = await _ssx?.storage.get(path);
// //   return response?.data;
// // };

// // export const deleteFromKepler = async (path: string): Promise<any> => {
// //   const response = await _ssx?.storage.delete(path);
// //   return response?.status;
// // };
