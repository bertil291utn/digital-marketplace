import { sdk } from './connection/third-web-conn';

export const NFTContract = (contractAddress) =>
  sdk.getNFTCollection(contractAddress);

export const mintNFT = async (contract, toAddress, metadataWithSupply) => {
  const tx = await contract.mintTo(toAddress, metadataWithSupply);
  console.log('tx', tx);
  return tx;
  // const firstNFT = await tx[0].data(); // (optional) fetch details of the first minted NFT
  // const receipt = tx[0].receipt; // same transaction receipt for all minted NFTs
  // const firstTokenId = tx[0].id; // token id of the first minted NFT
};
