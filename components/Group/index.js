import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateGroup } from '../../services/groups';
import BalancePanel from '../BalancePanel';
import ExpensesPanel from '../ExpensesPanel';
import MembersPanel from '../MembersPanel';
import Typed from '../Typed';

export default function Group(group) {
  const { id, name, description, expenses } = group;

  const [members, setMembers] = useState(group.members);

  const updateMembers = (members) => {
    const promise = updateGroup(id, { members });
    toast
      .promise(promise, {
        success: 'Se ha actualizado el grupo',
        error: 'No se ha podido actualizar el grupo',
        pending: 'Actualizando grupo...',
      })
      .then((then) => {
        console.log({ then });
      });
  };

  const tabs = [
    {
      label: 'Gastos',
      Component: ExpensesPanel,
      data: { expenses, members },
    },
    {
      label: 'Saldo',
      Component: BalancePanel,
      data: expenses,
    },
    {
      label: 'Miembros',
      Component: MembersPanel,
      data: { members, setMembers, updateMembers },
    },
  ];

  return (
    <div className="w-2/3 p-4 mx-auto mt-10 border-2 shadow-[0_0_10px_0_black] border-orange-600 rounded-lg xl:w-2/4 h-fit">
      <h1 className="text-3xl font-semibold text-center">
        <Typed bold text={name} cursor="" />
      </h1>
      <p className="text-justify">
        <Typed text={description} cursor="" typeSpeed={10} />
      </p>
      <Tab.Group>
        <Tab.List className="flex p-1 mt-4 space-x-1 text-black bg-gradient-to-br from-orange-600 to-orange-900 rounded-xl">
          {tabs.map((tab) => {
            return (
              <Tab
                key={tab.label}
                className={({ selected }) =>
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 focus-visible:outline-none transition-colors ' +
                  (selected
                    ? 'bg-white shadow text-orange-700'
                    : 'text-white hover:bg-white/[0.12] hover:text-white')
                }
              >
                {tab.label}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {tabs.map(({ Component, label, data }) => {
            return (
              <Tab.Panel
                key={label}
                className="p-3 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg shadow-[0_0_10px_0] shadow-black/60"
              >
                <Component {...data} />
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
