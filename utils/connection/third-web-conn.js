import { ThirdwebSDK } from '@thirdweb-dev/sdk';


export const sdk = new ThirdwebSDK(
  `https://matic-${
    process.env.NEXT_PUBLIC_ENV === 'develop' ? 'mumbai' : 'mainnet'
  }.chainstacklabs.com`
);
