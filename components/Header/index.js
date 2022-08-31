import Avatar from '../Avatar';
import Link from 'next/link';
import Navbar from './Navbar';
import Navitem from './Navbar/Navitem';
import Button from '../Button';
import { Fragment, useState } from 'react';
import {
  loginWithGoogle,
  loginWithTwitter,
  logout,
} from '../../services/firebase/client';
import LoginModal from '../LoginModal';
import { Menu, Transition } from '@headlessui/react';
import { LogoutIcon } from '@heroicons/react/outline';
import useAuth from '../../hooks/useAuth';
import authStatus from '../../context/auth/status';

export default function Header() {
  const { user, status } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => logout();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleLoginGoogle = () => {
    loginWithGoogle()
      .then(() => closeModal())
      .catch((err) => console.error(err));
  };

  const handleLoginTwitter = () => {
    loginWithTwitter()
      .then(() => closeModal())
      .catch((err) => console.log(err));
  };

  return (
    <header className="sticky top-0 z-50 flex flex-row items-center w-full h-20 gap-5 px-32 place-content-between bg-slate-800">
      <div className="p-2 transition-all rounded-md hover:shadow-sm hover:bg-slate-600 shadow-black">
        <Link href="/">
          <a className="text-2xl font-bold text-white">CostD</a>
        </Link>
      </div>
      <Navbar>
        <Navitem href="/">Inicio</Navitem>
        <Navitem href="/groups">Grupos</Navitem>
      </Navbar>
      {status !== authStatus.authenticated ? (
        <>
          <Button bordered onClick={openModal} color="blue">
            Iniciar sesión
          </Button>
        </>
      ) : (
        <div className="relative">
          <Menu>
            <Menu.Button>
              <Avatar name={user.displayName} photo={user.avatar} />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 p-1 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? 'bg-gradient-to-br from-orange-500 to-orange-800 text-white'
                          : 'text-gray-900'
                      } group flex gap-2 flex-row w-full font-semibold items-center rounded-md px-2 py-2 text-sm`}
                      onClick={handleLogout}
                    >
                      <LogoutIcon className="w-5 h-5" />
                      Cerrar sesión
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
      <LoginModal
        closeModal={closeModal}
        isOpen={isOpen}
        handleLoginGoogle={handleLoginGoogle}
        handleLoginTwitter={handleLoginTwitter}
      />
    </header>
  );
}
