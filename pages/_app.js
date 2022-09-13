import Layout from '../components/Layout';
import { AuthProvider } from '../context/auth';
import { LoginModalProvider } from '../context/loginModal';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
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
