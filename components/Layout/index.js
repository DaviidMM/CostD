import authStatus from '../../context/auth/status';
import useAuth from '../../hooks/useAuth';
import Header from '../Header';
import Dots from '../Loading/Dots';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';

export default function Layout({ children }) {
  const auth = useAuth();
  const { status } = auth;

  return (
    <>
      <Head>
        <title>CostD - ¡Comparte gastos!</title>
      </Head>
      <section className="flex flex-col min-h-screen bg-zinc-800 selection:bg-orange-400 selection:text-white">
        <ToastContainer theme="dark" />
        <Header />
        <main className="flex flex-grow w-full px-6 mx-auto max-w-7xl">
          {status === authStatus.loading ? <Dots /> : children}
        </main>
      </section>
    </>
  );
}
