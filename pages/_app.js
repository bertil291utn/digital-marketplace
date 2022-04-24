import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import Navbar from '../components/Navbar';

import GlobalContext from '../providers/GlobalProviders';
import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      supportedChains={[ChainId.Mumbai, ChainId.Rinkeby]}
      connectors={{
        injected: {},
      }}
    >
      <GlobalContext>
        <Navbar />
        <Component {...pageProps} />
      </GlobalContext>
    </ThirdwebProvider>
  );
}

export default MyApp;
