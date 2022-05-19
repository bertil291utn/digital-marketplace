import { sdk } from './connection/third-web-conn';
export const contract = async (funcContractName) => {
  const _sdk = await sdk();
  return _sdk[funcContractName](process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS);
};

export const mintNFT = (toAddress, metadataWithSupply, contract) => {
  try {
    return contract.mintTo(toAddress, metadataWithSupply);
  } catch (error) {
    console.log(`MintTo error ${error.message}`);
  }
};

export const mintBatchNFT = (metadatas, contract) => {
  try {
    return contract.createBatch(metadatas);
  } catch (error) {
    console.log(`Mint nft batch error ${error.message}`);
  }
};

export const setClaimConditions = (
  claimConditions,
  contract,
  tokenId = false
) => {
  try {
    return tokenId
      ? contract.claimConditions.set(tokenId, claimConditions)
      : contract.claimConditions.set(claimConditions);
  } catch (error) {
    console.log(`Set claims error ${error.message}`);
  }
};
