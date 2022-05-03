import { sdk } from './connection/third-web-conn';

export const mintNFT = async (toAddress, metadataWithSupply) => {
  try {
    const _sdk = await sdk();
    //TODO: test with nft collection address and getNFTCollection instead edition
    //or even try as drop with claim at the same time or claim later https://docs.thirdweb.com/typescript/sdk.editiondrop#methods
    //for this last one, add a release drop module on 3rdweb dashboard
    const contract = _sdk.getEdition(
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
    );
    const tx = await contract.mintTo(toAddress, metadataWithSupply);
    return tx;
  } catch (error) {
    console.log(error.message);
  }
};

export const mintBatchNFT = async (metadatas) => {
  try {
    const _sdk = await sdk();
    const contract = _sdk.getNFTDrop(
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
    );
    const tx = await contract.createBatch(metadatas);
    return tx;
  } catch (error) {
    console.log(error.message);
  }
};
