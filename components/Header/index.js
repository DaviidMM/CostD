import Avatar from '../Avatar';
import Link from 'next/link';
import Navbar from './Navbar';
import Navitem from './Navbar/Navitem';
import Button from '../Button';
import { Fragment, useEffect, useState } from 'react';
import {
  loginWithGoogle,
  loginWithTwitter,
  logout,
} from '../../services/firebase/client';
import LoginModal from '../LoginModal';
import { Menu, Transition } from '@headlessui/react';
import useAuth from '../../hooks/useAuth';
import authStatus from '../../context/auth/status';
import {
  ArrowLeftOnRectangleIcon,
  Bars3BottomLeftIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

export default function Header() {
  const { pathname } = useRouter();
  const auth = useAuth();
  const { user, status, openLoginModal } = auth;
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => setShowMenu(false), [pathname]);

  const handleLogout = () => logout();

  return (
    <header className="flex flex-row items-center w-full h-20 gap-5 px-8 md:px-32 text-slate-200 place-content-between">
      <input type="checkbox" id="menu" hidden className="peer" />
      <button onClick={() => setShowMenu(!showMenu)} className="z-50 md:hidden">
        <Bars3BottomLeftIcon
          className={'w-6 h-6' + (showMenu ? ' hidden' : '')}
        />
        <XMarkIcon
          className={'w-6 h-6 text-black' + (showMenu ? '' : ' hidden')}
        />
      </button>
      <div className="hidden p-2 transition-all hover:text-white md:block">
        <Link href="/">
          <a className="text-2xl font-semibold">
            Cost<i>D</i>
          </a>
        </Link>
      </div>
      <Navbar showMenu={showMenu}>
        <Navitem href="/">Inicio</Navitem>
        <Navitem href="/groups">Grupos</Navitem>
      </Navbar>
      {status !== authStatus.authenticated ? (
        <>
          <Button bordered onClick={openLoginModal} color="blue">
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
                      <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                      Cerrar sesión
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
    </header>
  );
}
