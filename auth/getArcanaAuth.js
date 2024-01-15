import { AuthProvider } from '@arcana/auth';

const auth = new AuthProvider(process.env.NEXT_PUBLIC_ARCANA_APP_ID, {
  theme: "dark",
  network: "testnet",
  connectOptions: {
    compact: true,
  },
  chainConfig: {
    chainId: "80001", //Polygon Mumbai Testnet ChainId
    rpcUrl: "https://rpc.ankr.com/polygon_mumbai",
  },
});

const getAuth = () => {
  return auth;
};

export { getAuth };
