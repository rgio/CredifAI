// import type { SSX } from '@spruceid/ssx';
// import React, { createContext, useState, useContext } from 'react';

// //import { writable, type Writable } from 'svelte/store';

// export const DEFAULT_ACCOUNT_AVATAR =
//   'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

// export interface EnsData {
//   domain: string;
//   avatarUrl?: string;
// }

// export interface ProfileData {
//   address: string;
//   username?: string;
//   avatar?: string;
//   ens?: EnsData;
//   credential?: any;
// }

// const AuthContext = createContext({
//   ssx: null,
// });

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }: { children: any}) => {
//   const [ssx, setSSX] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [loadingProfile, setLoadingProfile] = useState(false);
//   const [showLoader, setShowLoader] = useState(false);

//   const contextValue = {
//     ssx,
//     setSSX,
//     profile,
//     setProfile,
//     loadingProfile,
//     setLoadingProfile,
//     showLoader,
//     setShowLoader,
//   };
  
//   return (
//     <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );

// }
