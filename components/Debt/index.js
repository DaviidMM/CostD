import { Menu, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import ColoredBorder from '../ColoredBorder';

export default function Debt({ amount, from, onPay, to }) {
  return (
    <ColoredBorder color="orange" className="overflow-visible rounded-3xl">
      <div className="flex flex-row items-center justify-between px-4 py-2 rounded-3xl bg-zinc-900">
        <div className="flex flex-col w-1/5">
          <span className="font-semibold text-sky-500">{from.name}</span>
          <small>debe a</small>
          <span className="font-semibold text-sky-500">{to.name}</span>
        </div>
        <span className="text-4xl font-semibold text-red-500">{amount}€</span>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex flex-row items-center justify-center gap-2 p-2 font-semibold text-black transition-all duration-500 rounded-xl w-fit focus:outline-none hover:text-white bg-gradient-to-br from-yellow-400 via-orange-500 to-rose-500 bg-size-200 bg-pos-0 hover:bg-pos-100">
              Opciones
              <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-50 w-56 mt-2 origin-top-right border border-white divide-y divide-gray-100 rounded-md shadow-lg bg-zinc-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-zinc-200 text-black' : 'text-white'
                      } group transition-all font-semibold flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => onPay({ amount, from, to })}
                    >
                      <CheckCircleIcon
                        className={
                          'w-5 h-5 mr-1 text-green-600 transition-transform ' +
                          (active ? 'scale-100' : 'scale-0')
                        }
                      />
                      <CheckIcon
                        className={
                          'w-5 h-5 mr-1 text-green-600 transition-transform absolute ' +
                          (active ? 'scale-0' : 'scale-100')
                        }
                      />{' '}
                      Marcar como pagado
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </ColoredBorder>
  );
}
