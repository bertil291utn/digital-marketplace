import { sdk } from './connection/third-web-conn';

export const mintNFT = async (toAddress, metadataWithSupply) => {
  try {
    const _sdk = await sdk();
    const contract = _sdk.getEdition(
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
    );
    const tx = await contract.mintTo(toAddress, metadataWithSupply);
    return tx;
  } catch (error) {
    console.log(error.message);
  }
  // const firstNFT = await tx[0].data(); // (optional) fetch details of the first minted NFT
  // const receipt = tx[0].receipt; // same transaction receipt for all minted NFTs
  // const firstTokenId = tx[0].id; // token id of the first minted NFT
};
