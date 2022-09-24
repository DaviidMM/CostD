import Layout from '../components/Layout';
import PushNotificationLayout from '../components/PushNotificationLayout';
import { AuthProvider } from '../context/auth';
import { LoginModalProvider } from '../context/loginModal';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <PushNotificationLayout>
      <AuthProvider>
        <LoginModalProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LoginModalProvider>
      </AuthProvider>
    </PushNotificationLayout>
  );
}

export default MyApp;
