import Layout from '../src/components/Layout';
import { AuthProvider } from '../src/context/auth';
import { LoginModalProvider } from '../src/context/loginModal';
import '../styles/globals.css';

function MyApp ({ Component, pageProps }) {
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
