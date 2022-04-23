import { ThirdwebSDK } from '@thirdweb-dev/sdk';

export const sdk = new ThirdwebSDK(
  process.env.NEXT_PUBLIC_ENV === 'develop' ? 'mumbai' : 'polygon'
);
