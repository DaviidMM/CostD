import { getMessaging } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { AuthProvider } from '../context/auth';
import { LoginModalProvider } from '../context/loginModal';
import { firebaseCloudMessaging } from '../services/firebase/client';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  if (mounted) {
    firebaseCloudMessaging.onMessage();
  }
  useEffect(() => {
    firebaseCloudMessaging.init();
    const setToken = async () => {
      const token = await firebaseCloudMessaging.tokenInLocalStorage();
      if (token) {
        setMounted(true);
        // not working
      }
    };
    const result = setToken();
    console.log('result', result);
  }, []);
  return (
    <AuthProvider>
      <LoginModalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LoginModalProvider>
    </AuthProvider>
  );
}

export default MyApp;
