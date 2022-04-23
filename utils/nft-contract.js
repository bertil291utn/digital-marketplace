import { sdk } from './connection/third-web-conn';

export const NFTContract = (contractAddress) =>
  sdk.getNFTCollection(contractAddress);
