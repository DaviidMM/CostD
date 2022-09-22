import authStatus from '../../context/auth/status';
import useAuth from '../../hooks/useAuth';
import Header from '../Header';
import Dots from '../Loading/Dots';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import Footer from '../Footer';

export default function Layout({ children }) {
  const auth = useAuth();
  const { status } = auth;

  return (
    <>
      <Head>
        <title>CostD - ¡Comparte gastos!</title>
      </Head>
      <Header />
      <section className="flex flex-col min-h-screen">
        <ToastContainer theme="dark" />
        <main className="flex flex-grow w-full p-6 mx-auto max-w-[1400px]">
          {status === authStatus.loading ? <Dots /> : children}
        </main>
      </section>
      <Footer />
    </>
  );
}
