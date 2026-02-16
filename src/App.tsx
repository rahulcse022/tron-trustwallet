import {  useMemo, useEffect } from 'react';
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
      alert(`Successfully connected! Address: ${address}`);
    }
  }, [connected, address]);

  return (
    <div className="App">
      <h1>Tron WalletConnect Integration</h1>
      <div className="card">
        <WalletActionButton />
        <div style={{ fontSize: '12px', marginTop: '10px', color: '#888' }}>
          <p>For Trust Wallet Mobile, select <strong>WalletConnect</strong>.</p>
          <p>For Trust Wallet Extension, select <strong>Trust</strong>.</p>
        </div>
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
        explorerRecommendedWalletIds: [
          '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
          'a761af5ebcd8544c20531853d9e4a34b2f6ef57b85e0541703668be510808233', // TronLink (if supported on WC) or other popular ones
          'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask (just in case they use it for other chains, though not Tron specific)
          // Add TokenPocket or others if needed
        ],
      },
    });

    const tronLinkAdapter = new TronLinkAdapter();
    const trustAdapter = new TrustAdapter({
        openUrlWhenWalletNotFound: true,
    });

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
