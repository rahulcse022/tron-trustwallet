import { useState, useMemo, useEffect } from 'react';
import { WalletProvider, useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletModalProvider, WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';
import { WalletConnectAdapter } from '@tronweb3/tronwallet-adapter-walletconnect';
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapters';
import { TrustAdapter } from '@tronweb3/tronwallet-adapter-trust';
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
        projectId: 'YOUR_PROJECT_ID',
        metadata: {
          name: 'Tron WalletConnect App',
          description: 'Tron WalletConnect Integration',
          url: 'https://your-dapp-url.com',
          icons: ['https://your-dapp-url.com/icon.png'],
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
    const trustAdapter = new TrustAdapter();

    return [walletConnectAdapter, tronLinkAdapter, trustAdapter];
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
