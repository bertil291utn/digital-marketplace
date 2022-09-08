require('dotenv').config();

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  // const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  // const nftMarket = await NFTMarket.deploy();
  // await nftMarket.deployed();
  // console.log("nftMarket deployed to:", nftMarket.address);

  const NFT = await ethers.getContractFactory('NFT');
  // const nft = await NFT.deploy(nftMarket.address);
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log('nft deployed to:', nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
