import '@styles/styles.css';
import { getAuth } from "../../auth/getArcanaAuth";
import { ProvideAuth } from '@arcana/auth-react';
import Layout from "../../components/layout";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const auth = getAuth();

export default function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth provider={auth}>
      <Layout className={inter.className}>
        <Component {...pageProps} />
      </Layout>
    </ProvideAuth>
  );
}
