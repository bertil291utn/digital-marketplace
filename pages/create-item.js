/* pages/create-item.js */
import { useState } from 'react';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';
import Image from 'next/image';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

import { nftaddress, nftmarketaddress } from '../config';

import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json';
import Upload from '../components/upload';

export default function CreateItem() {
  const [fileCoverUrl, setFileCoverUrl] = useState();
  const [fileMp3Name, setFileMp3Name] = useState();
  const [formInput, updateFormInput] = useState({
    name: '',
    description: '',
    supply: '',
    // attributes:[{
    //   "trait_type":'',
    //   "value": ""
    // }, ]
  });
  const router = useRouter();

  function onChangeCover(e) {
    const preview=URL.createObjectURL(e.target.files[0])
    setFileCoverUrl(preview);
  }

  function onChangeMp3(e) {
    setFileMp3Name(e.target.files[0].name);
  }
  // console.log('e', e.target.files);
  // const file = e.target.files[0];
  // try {
  //   const added = await client.add(file, {
  //     progress: (prog) => console.log(`received: ${prog}`),
  //   });
  //   setFileUrl(added.path);
  // } catch (error) {
  //   console.log('Error uploading file: ', error);
  // }
  async function createMarket() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      ipfs_image_url: `ipfs://${fileUrl}`,
      image: `https://ipfs.infura.io/ipfs/${fileUrl}`,
      external_url: 'https://www.distrofank.xyz',
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    console.log('tx after mint', tx);
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    const price = ethers.utils.parseUnits(formInput.price, 'ether');

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();
    router.push('/');
  }

  return (
    <div className='w-3/4 mx-auto my-10'>
      <div className='pb-12'>
        <div className='flex gap-8'>
          <div className='w-full flex flex-col'>
            <input
              placeholder='Asset Name'
              className='mt-8 border rounded p-4'
              onChange={(e) =>
                updateFormInput({ ...formInput, name: e.target.value })
              }
            />
            <textarea
              placeholder='Asset Description'
              className='mt-2 border rounded p-4'
              onChange={(e) =>
                updateFormInput({ ...formInput, description: e.target.value })
              }
            />
          </div>
          {/* <inputf */}
          <div className='w-full flex flex-col gap-5'>
            <Upload
              label='NFT cover'
              primaryText='Upload File'
              optionalTest='PNG, JPG, GIF up to 10MB'
              id='cover'
              src={fileCoverUrl}
              onChange={onChangeCover}
            />

            <Upload
              label='Media file'
              primaryText='Upload File'
              optionalTest='MP3, WAV up to 10MB'
              id='coverMp3'
              src={fileMp3Name}
              onChange={onChangeMp3}
            />
          </div>
          {/* upload mp3, this goes to centralized storage */}
        </div>
        {/* {fileUrl && (
          <Image
            className='rounded mt-4'
            src={fileUrl}
            alt='nft to be minted'
            layout='fill'
            width={500}
            height={500}
          />
        )} */}
        <div className='w-3/4 mx-auto my-10'>
          <button
            onClick={createMarket}
            className='font-bold bg-pink-500 text-white rounded p-4 shadow-lg  w-full'
          >
            Mint and Sell
          </button>
        </div>
      </div>
    </div>
  );
}
