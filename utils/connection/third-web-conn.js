import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const sdk = new ThirdwebSDK('rinkeby');
export const contract = sdk.getEdition(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS);