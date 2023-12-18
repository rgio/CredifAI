// import type { ethers } from 'ethers';

// export type AttestationTypes = "InsightAttestation" | "OpinionAttestation";

// /* CREDENTIALS */
// export interface Subject {
//   pkh: {
//     eip155: {
//       address: string;
//       chain_id: string;
//     };
//   };
// }

// export enum CredentialTypesEnum {
//   InsightAttestation = 'InsightAttestation',
// }

// export const allCredentialTypes: Array<AttestationTypes> = [
//   'InsightAttestation',
// ];

// export interface BaseCredentialContent {
//   type: AttestationTypes;
//   // The DID of the user who is the credential subject, comes from the VC.credentialSubject.id
//   subject: string;
//   // The URN of the UUID of the credential.
//   id: string;
//   // The issuance date of the credential.
//   issuanceDate: string;
// }

// export interface Insight extends BaseCredentialContent {
//   type: 'InsightAttestation';
//   content: string;
//   opinion: string;
// }

// // export interface BookReview extends BaseCredentialContent {
// //   type: 'BookReviewAttestation';
// //   link: string;
// //   rating: number;
// //   review: string;
// //   title: string;
// // }


// export type CredentialContent =
//   | Insight;

// export type CredentialEntry = {
//   jwt: string;
//   content: CredentialContent;
// };

// export const encode = (c: string): string => {
//   return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
// };

// // TODO: Retype any to a credential type?
// export const parseJWT = (jwt_str: string): any => {
//   const v = jwt_str.split('.');

//   if (v.length !== 3) {
//     throw new Error('Invalid JWT format');
//   }

//   const u = v[1];
//   const b64 = u.replace(/-/g, '+').replace(/_/g, '/');
//   const encoded = atob(b64).split('').map(encode).join('');
//   const json_str = decodeURIComponent(encoded);

//   return JSON.parse(json_str);
// };

// export const toCredentialContent = (jwt_str: string): CredentialContent | void => {
//   const parsed = parseJWT(jwt_str);
//   const vc = parsed?.vc;
//   if (!vc) {
//     throw new Error('Malformed jwt, no vc property');
//   }

//   const t = vc?.type;
//   if (!t) {
//     throw new Error('Malformed credential, no type property');
//   }

//   if (t.length !== 2) {
//     throw new Error('Malformed credential, type property did not have length of 2');
//   }

//   const credType = t[1];
//   if (!allCredentialTypes.includes(credType)) {
//     throw new Error(`Unsupported Credential Type: ${credType}`);
//   }

//   const credID = vc?.id;
//   if (!credID) {
//     throw new Error('No id property found under vc property in JWT credential');
//   }

//   const subjID = vc?.credentialSubject?.id;
//   if (!subjID) {
//     throw new Error('No id property found under vc.credentialSubject property in JWT credential');
//   }

//   const issuanceDate = vc?.issuanceDate;
//   if (!issuanceDate) {
//     throw new Error('No issuanceDate property found under vc property in JWT credential');
//   }

//   const c = {
//     type: credType,
//     id: credID,
//     subject: subjID,
//     issuanceDate
//   };

//   switch (credType as AttestationTypes) {
//     case 'InsightAttestation': {
//       const next: Partial<Insight> = {
//         content: getCredSubjProp('content', vc),
//         opinion: getCredSubjProp('opinion', vc)
//       };

//       return Object.assign({}, c, next) as Insight;
//     }
//   }
// };

// export const toCredentialEntry = (jwt_str: string): CredentialEntry => {
//   const content = toCredentialContent(jwt_str);
//   return { jwt: jwt_str, content: content as CredentialContent };
// };

// const getCredSubjProp = (prop: string, vc: any): any => {
//   const x = vc?.credentialSubject[prop];
//   if (!x) {
//     throw new Error(
//       `No ${prop} property found under vc.credentialSubject property in JWT credential`
//     );
//   }
//   return x;
// };

// /* SIGNER */

// export interface ISigner {
//   id: string;
//   sign: (statement: string) => Promise<string>;
//   // disconnect: () => Promise<void>;
//   toSubject: () => Promise<Subject>;
//   web3Provider: ethers.providers.Web3Provider;
// }

// export class Signer implements ISigner {
//   public id: string;
//   public web3Provider: ethers.providers.Web3Provider;
//   public signer: ethers.providers.JsonRpcSigner;

//   constructor(id: string, web3Provider: ethers.providers.Web3Provider) {
//     this.id = id;
//     this.web3Provider = web3Provider;
//     this.signer = web3Provider.getSigner();
//   }

//   sign = async (statement: string): Promise<string> => {
//     const inner_ids = await this.web3Provider.listAccounts();
//     if (this.id !== inner_ids[0]) {
//       throw new Error(
//         `Signer has changed on Provider's side, expected: ${this.id}, got ${inner_ids[0]}`
//       );
//     }
//     return this.signer.signMessage(statement);
//   };

//   toSubject = async (): Promise<Subject> => {
//     const inner_ids = await this.web3Provider.listAccounts();
//     if (this.id !== inner_ids[0]) {
//       throw new Error(
//         `Signer has changed on Provider's side, expected: ${this.id}, got ${inner_ids[0]}`
//       );
//     }
//     return {
//       pkh: {
//         eip155: {
//           address: this.id,
//           chain_id: '1'
//         }
//       }
//     };
//   };
// }
