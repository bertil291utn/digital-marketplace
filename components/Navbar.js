import Link from 'next/link';
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import { useState } from 'react';

const Navbar = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const initialState = {
    home: true,
    sell: false,
    myAssets: false,
    dashboard: false,
  };
  const [linkState, setLinkState] = useState(initialState);
  return (
    <nav className='border-b p-6'>
      <p className='text-4xl font-bold'>Distro Fank</p>
      <div className='flex mt-4 content-between'>
        <div className='flex'>
          <Link href='/'>
            <a
              onClick={() => setLinkState({ home: true })}
              className={`mr-4 text-pink-500 ${
                linkState.home ? 'active-link' : ''
              }`}
            >
              Home
            </a>
          </Link>
          <Link href='/create-item'>
            <a
              onClick={() => setLinkState({ sell: true })}
              className={`mr-6 text-pink-500 ${
                linkState.sell ? 'active-link' : ''
              }`}
            >
              Sell Digital Asset
            </a>
          </Link>
          <Link href='/my-assets'>
            <a
              onClick={() => setLinkState({ myAssets: true })}
              className={`mr-6 text-pink-500 ${
                linkState.myAssets ? 'active-link' : ''
              }`}
            >
              My Digital Assets
            </a>
          </Link>
          <Link href='/creator-dashboard'>
            <a
              onClick={() => setLinkState({ dashboard: true })}
              className={`mr-6 text-pink-500 ${
                linkState.dashboard ? 'active-link' : ''
              }`}
            >
              Creator Dashboard
            </a>
          </Link>
        </div>
        <div>
          {address ? (
            <>
              <button onClick={disconnectWallet}>Disconnect Wallet</button>
              <p>Your address: {address}</p>
            </>
          ) : (
            <button onClick={connectWithMetamask}>Connect with Metamask</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
