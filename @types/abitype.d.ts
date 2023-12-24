declare module "abitype" {
  export function formatAbi<TAbi extends Abi | readonly unknown[]>(abi: TAbi): FormatAbi<TAbi>;
  // ... other declarations
}