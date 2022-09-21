import Avatar from '../Avatar';
import Link from 'next/link';
import Navbar from '../Navbar';
import Navitem from '../Navbar/Navitem';
import Button from '../Button';
import { Fragment, useEffect, useState } from 'react';
import { logout } from '../../services/firebase/client';
import { Menu, Transition } from '@headlessui/react';
import useAuth from '../../hooks/useAuth';
import authStatus from '../../context/auth/status';
import {
  ArrowLeftOnRectangleIcon,
  Bars3BottomLeftIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { useLoginModal } from '../../hooks/useLoginModal';

export default function Header() {
  const { pathname } = useRouter();
  const { user, status } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const { openLoginModal } = useLoginModal();

  useEffect(() => setShowMenu(false), [pathname]);

  const handleLogout = () => logout();

  return (
    <header className="flex flex-col text-slate-200 bg-gradient-to-br from-green-500 to-green-900">
      <div className="flex flex-row items-center w-full h-20 gap-5 px-8 md:px-32 place-content-between">
        <input type="checkbox" id="menu" hidden className="peer" />
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="z-50 md:hidden"
        >
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
        <Navbar onClick={() => setShowMenu(!showMenu)} showMenu={showMenu}>
          <Navitem href="/">Inicio</Navitem>
          {status === authStatus.authenticated && (
            <Navitem href="/groups">Grupos</Navitem>
          )}
        </Navbar>
        {status !== authStatus.authenticated ? (
          <>
            <Button onClick={openLoginModal} color="blue">
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
                <Menu.Items className="absolute right-0 z-20 w-56 p-1 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
      </div>
      <div className="h-7 bg-zinc-800 rotate-180 md:[clip-path:polygon(100%_0%,_0%_0%_,_0%_51.61%,_1%_51.35%,_2%_50.57%,_3%_49.28%,_4%_47.51%,_5%_45.30%,_6%_42.70%,_7%_39.75%,_8%_36.52%,_9%_33.06%,_10%_29.46%,_11%_25.79%,_12%_22.12%,_13%_18.52%,_14%_15.07%,_15%_11.84%,_16%_8.89%,_17%_6.29%,_18%_4.08%,_19%_2.32%,_20%_1.04%,_21%_0.26%,_22%_0.00%,_23%_0.27%,_24%_1.06%,_25%_2.35%,_26%_4.12%,_27%_6.33%,_28%_8.94%,_29%_11.89%,_30%_15.13%,_31%_18.58%,_32%_22.18%,_33%_25.86%,_34%_29.53%,_35%_33.13%,_36%_36.58%,_37%_39.80%,_38%_42.75%,_39%_45.35%,_40%_47.55%,_41%_49.31%,_42%_50.59%,_43%_51.36%,_44%_51.61%,_45%_51.34%,_46%_50.55%,_47%_49.25%,_48%_47.48%,_49%_45.26%,_50%_42.65%,_51%_39.69%,_52%_36.46%,_53%_33.00%,_54%_29.40%,_55%_25.72%,_56%_22.05%,_57%_18.45%,_58%_15.01%,_59%_11.78%,_60%_8.84%,_61%_6.24%,_62%_4.05%,_63%_2.29%,_64%_1.02%,_65%_0.25%,_66%_0.00%,_67%_0.28%,_68%_1.07%,_69%_2.37%,_70%_4.15%,_71%_6.37%,_72%_8.99%,_73%_11.95%,_74%_15.19%,_75%_18.64%,_76%_22.25%,_77%_25.92%,_78%_29.59%,_79%_33.19%,_80%_36.63%,_81%_39.86%,_82%_42.80%,_83%_45.39%,_84%_47.58%,_85%_49.33%,_86%_50.60%,_87%_51.37%,_88%_51.61%,_89%_51.33%,_90%_50.53%,_91%_49.22%,_92%_47.44%,_93%_45.22%,_94%_42.60%,_95%_39.64%,_96%_36.40%,_97%_32.94%,_98%_29.34%,_99%_25.66%,_100%_21.99%)] [clip-path:polygon(100%_0%,_0%_0%_,_0%_46.67%,_1%_46.62%,_2%_46.46%,_3%_46.21%,_4%_45.86%,_5%_45.40%,_6%_44.86%,_7%_44.22%,_8%_43.49%,_9%_42.67%,_10%_41.78%,_11%_40.80%,_12%_39.76%,_13%_38.65%,_14%_37.47%,_15%_36.24%,_16%_34.97%,_17%_33.65%,_18%_32.29%,_19%_30.91%,_20%_29.50%,_21%_28.08%,_22%_26.65%,_23%_25.23%,_24%_23.81%,_25%_22.40%,_26%_21.02%,_27%_19.66%,_28%_18.34%,_29%_17.07%,_30%_15.84%,_31%_14.67%,_32%_13.56%,_33%_12.51%,_34%_11.54%,_35%_10.64%,_36%_9.83%,_37%_9.10%,_38%_8.46%,_39%_7.92%,_40%_7.47%,_41%_7.12%,_42%_6.87%,_43%_6.72%,_44%_6.67%,_45%_6.72%,_46%_6.87%,_47%_7.13%,_48%_7.48%,_49%_7.94%,_50%_8.49%,_51%_9.13%,_52%_9.86%,_53%_10.67%,_54%_11.57%,_55%_12.55%,_56%_13.59%,_57%_14.71%,_58%_15.88%,_59%_17.11%,_60%_18.39%,_61%_19.71%,_62%_21.07%,_63%_22.45%,_64%_23.86%,_65%_25.28%,_66%_26.70%,_67%_28.13%,_68%_29.55%,_69%_30.96%,_70%_32.34%,_71%_33.69%,_72%_35.01%,_73%_36.29%,_74%_37.52%,_75%_38.69%,_76%_39.80%,_77%_40.84%,_78%_41.81%,_79%_42.70%,_80%_43.52%,_81%_44.24%,_82%_44.88%,_83%_45.42%,_84%_45.87%,_85%_46.22%,_86%_46.47%,_87%_46.62%,_88%_46.67%,_89%_46.61%,_90%_46.46%,_91%_46.20%,_92%_45.84%,_93%_45.39%,_94%_44.84%,_95%_44.19%,_96%_43.46%,_97%_42.64%,_98%_41.74%,_99%_40.77%,_100%_39.72%)]"></div>
    </header>
  );
}
