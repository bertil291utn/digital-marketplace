/* pages/_app.js */
import Link from 'next/link';
import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const initialState = {
    home: false,
    sell: false,
    myAssets: false,
    dashboard: false,
  };
  const [linkState, setLinkState] = useState({ ...initialState, home: true });
  return (
    <div>
      <nav className='border-b p-6'>
        <p className='text-4xl font-bold'>Distro Fank</p>
        <div className='flex mt-4'>
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
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
