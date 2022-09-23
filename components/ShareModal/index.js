import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';
import { RWebShare } from 'react-web-share';
import Button from '../Button';

export default function ShareModal({ onClose, open, url, group }) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white backdrop-blur bg-opacity-10" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="items-center text-lg font-medium leading-6 text-gray-900"
                >
                  Compartir grupo
                </Dialog.Title>
                <Dialog.Description className="mt-2 mb-4 text-sm text-gray-500">
                  ¡Comparte el código QR o el enlace del grupo!
                </Dialog.Description>
                <div className="flex flex-row items-center justify-center gap-8">
                  <QRCode value={url} size={128} />
                  <RWebShare
                    closeText="Cerrar"
                    data={{
                      text: `¡Accede al grupo "${group.name}" para compartir gastos en CostD!`,
                      url,
                      title: 'Compartir grupo de CostD',
                    }}
                    sites={['whatsapp', 'telegram', 'copy']}
                    onClick={() =>
                      new Promise((resolve) =>
                        resolve(toast.success('¡Compartido!'))
                      ).then(onClose)
                    }
                  >
                    <Button>Compartir enlace</Button>
                  </RWebShare>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
