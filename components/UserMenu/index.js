import { Menu, Transition } from '@headlessui/react';
import {
  ArrowLeftOnRectangleIcon,
  Cog8ToothIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Fragment } from 'react';
import Avatar from '../Avatar';

export default function UserMenu({ onLogout, user }) {
  return (
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
                <Link
                  href="/preferences"
                  className={`${
                    active
                      ? 'bg-gradient-to-br from-orange-500 to-orange-800 text-white'
                      : 'text-gray-900'
                  } flex gap-2 flex-row w-full font-semibold items-center rounded-md px-2 py-2 text-sm`}
                  legacyBehavior={false}
                >
                  <Cog8ToothIcon className="w-5 h-5" />
                  Preferencias
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active
                      ? 'bg-gradient-to-br from-orange-500 to-orange-800 text-white'
                      : 'text-gray-900'
                  } flex gap-2 flex-row w-full font-semibold items-center rounded-md px-2 py-2 text-sm`}
                  onClick={onLogout}
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
  );
}
