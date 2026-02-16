import {  useMemo, useEffect } from 'react';
import { WalletProvider, useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletModalProvider, WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';
import { WalletConnectAdapter } from '@tronweb3/tronwallet-adapter-walletconnect';
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapters';
import '@tronweb3/tronwallet-adapter-react-ui/style.css';
import './App.css';

function AppContent() {
  const { address, connected, wallet } = useWallet();

  useEffect(() => {
    if (connected && address) {
      console.log(`Connected to Tron network. Address: ${address}`);
      // "Just after connect" logic here
      alert(`Successfully connected! Address: ${address}`);
    }
  }, [connected, address]);

  return (
    <div className="App">
      <h1>Tron WalletConnect Integration</h1>
      <div className="card">
        <WalletActionButton />
        {connected && (
          <div style={{ marginTop: '20px' }}>
            <p>Connected Wallet: {wallet?.adapter.name}</p>
            <p>Address: <span style={{ fontWeight: 'bold' }}>{address}</span></p>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const adapters = useMemo(() => {
    const walletConnectAdapter = new WalletConnectAdapter({
      network: 'Mainnet',
      options: {
        relayUrl: 'wss://relay.walletconnect.com',
        projectId: '0ce8aee287b84db4976604d12ad15af9',
        metadata: {
          name: 'Tron WalletConnect App',
          description: 'Tron WalletConnect Integration',
          url: 'https://tron-trustwallet-v58n.vercel.app',
          icons: ['https://trustwallet.com/favicon.ico'],
        },
      },
      web3ModalConfig: {
        themeMode: 'dark',
        themeVariables: {
          '--wcm-z-index': '1000',
        },
      },
    });

    const tronLinkAdapter = new TronLinkAdapter();

    return [walletConnectAdapter, tronLinkAdapter];
  }, []);

  return (
    <WalletProvider adapters={adapters} disableAutoConnectOnLoad={true}>
      <WalletModalProvider>
        <AppContent />
      </WalletModalProvider>
    </WalletProvider>
  );
}

export default App;
