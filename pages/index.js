/* pages/index.js */
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';
import Image from 'next/image';

import { NFT_TOKEN, MARKETPLACE, IPFS_DEDICATED_NODE } from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_ALCHEMY_NODE_URL
    );
    const tokenContract = new ethers.Contract(NFT_TOKEN, NFT.abi, provider);
    const data = await tokenContract.getAllRegisters();

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const items = await Promise.all(
      data.map(async (_, index) => {
        const tokenUri = await tokenContract.tokenURI(index + 1);
        const { data } = await axios.get(tokenUri);
        const urlDoc = await tokenContract.getRecord(data.name);
        let item = {
          image: data.image,
          name: data.name,
          description: data.description,
          urlDoc: `${IPFS_DEDICATED_NODE}/${urlDoc}`,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState('loaded');
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(MARKETPLACE, Market.abi, signer);

    /* user will be prompted to pay the asking proces to complete the transaction */
    const transaction = await contract.createMarketSale(
      NFT_TOKEN,
      nft.tokenId,
      {
        value: ethers.utils.parseUnits(nft.price.toString(), 'ether'),
      }
    );
    await transaction.wait();
    loadNFTs();
  }

  if (loadingState === 'loaded' && !nfts.length)
    return <h1 className='px-20 py-10 text-3xl'>No items in marketplace</h1>;
  return (
    <div className='flex justify-center'>
      <div className='px-4' style={{ maxWidth: '1600px' }}>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4'>
          {nfts.map((nft, i) => (
            <div key={i} className='border shadow rounded-xl overflow-hidden'>
              <Image
                src={nft.image}
                alt={'nft item ' + i}
                width={500}
                height={500}
              />
              <div className='p-4'>
                <p
                  style={{ height: '64px' }}
                  className='text-2xl font-semibold'
                >
                  {nft.name}
                </p>
                <div style={{ height: 'fitContent', overflow: 'hidden' }}>
                  <p className='text-gray-400'>{nft.description}</p>
                  <a href={nft.urlDoc} target='_blank' rel='noreferrer'>
                    <p>View documentation</p>
                  </a>
                </div>
              </div>
              <div className='p-4 bg-black'>
                <p className='text-2xl mb-4 font-bold text-white'>
                  {/* {nft.price} ETH */}
                  Type: IP song
                </p>
                {/* <button
                  className='w-full bg-pink-500 text-white font-bold py-2 px-12 rounded'
                  onClick={() => buyNft(nft)}
                >
                  Buy
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
