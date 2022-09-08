/* pages/create-item.js */
import { useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';
import Image from 'next/image';
import axios from 'axios';
import {
  NFT_TOKEN,
  PINATA_API_SECRET,
  PINATA_API_KEY,
} from '../config';


import NFT_ABI from '../contractsABI/NFT.json';

export default function CreateItem() {
  const [IPFS_URI, setIPFS_URI] = useState();

  const [formInput, updateFormInput] = useState({
    price: '',
    name: '',
    description: '',
  });
  const router = useRouter();

  async function onChange(e) {
    const files = e.target.files[0];
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const data = new FormData();
    data.append('file', files);
    axios
      .post(url, data, {
        headers: {
          'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_API_SECRET,
        },
      })
      .then(function (response) {
        setIPFS_URI(response.data.IpfsHash);
      })
      .catch(function (error) {
        console.log(
          '🚀 ~ file: create-item.js ~ line 55 ~ onChange ~ error',
          error.message
        );
      });
  }

  async function createMarket() {
    const { name, description, price } = formInput;
    if (!name) return;

    try {
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(name, IPFS_URI);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  async function createSale(bandName, IPFS_URI) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    let nftToken = new ethers.Contract(NFT_TOKEN, NFT_ABI, signer);
    let transaction = await nftToken.createToken(bandName);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    // const price = ethers.utils.parseUnits(formInput.price, 'ether');

    /* then list the item for sale on the marketplace */
    // contract = new ethers.Contract(MARKETPLACE, Market.abi, signer);
    // let listingPrice = await contract.getListingPrice();
    // listingPrice = listingPrice.toString();

    transaction = await nftToken.setRecord(IPFS_URI, bandName);
    await transaction.wait();
    router.push('/');
  }

  return (
    <div className='flex justify-center'>
      <div className='w-1/2 flex flex-col pb-12'>
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
        {/* <input
          placeholder='Asset Price in Eth'
          className='mt-2 border rounded p-4'
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        /> */}
        <input
          type='file'
          name='Asset'
          className='my-4'
          onChange={onChange}
          // multiple
        />

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

        <button
          onClick={createMarket}
          className='font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg'
        >
          Create Digital Asset and set Record
        </button>
      </div>
    </div>
  );
}
