import authStatus from '../../context/auth/status';
import useAuth from '../../hooks/useAuth';
import Header from '../Header';
import Dots from '../Loading/Dots';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }) {
  const auth = useAuth();
  const { status } = auth;

  return (
    <section className="flex flex-col min-h-screen bg-zinc-800">
      <ToastContainer theme="dark" />
      <Header />
      <main className="flex flex-grow w-full max-w-5xl px-6 mx-auto ">
        {status === authStatus.loading ? <Dots /> : children}
      </main>
    </section>
  );
}
