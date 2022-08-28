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
    <>
      <ToastContainer theme="dark" />
      <Header />
      <main className="flex flex-grow bg-gradient-to-br from-slate-600 via-slate-600 to-slate-900">
        {status === authStatus.loading ? <Dots /> : children}
      </main>
    </>
  );
}
