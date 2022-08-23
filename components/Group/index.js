import { Tab } from '@headlessui/react';
import BalancePanel from '../BalancePanel';
import ExpensesPanel from '../ExpensesPanel';

export default function Group({ name, description, expenses }) {
  const tabs = [
    {
      label: 'Gastos',
      Component: ExpensesPanel,
      data: { expenses },
    },
    {
      label: 'Saldos',
      Component: BalancePanel,
      data: expenses,
    },
  ];

  return (
    <div className="w-2/3 p-4 mx-auto mt-10 border-2 shadow-[0_0_10px_0_black] border-orange-600 rounded-lg xl:w-2/4 h-fit">
      <h1 className="text-3xl font-semibold text-center">{name}</h1>
      <p className="text-center">{description}</p>
      <Tab.Group>
        <Tab.List className="flex p-1 mt-4 space-x-1 text-black bg-gradient-to-br from-orange-600 to-orange-900 rounded-xl">
          {tabs.map((tab, idx) => {
            return (
              <Tab
                key={tab.label}
                className={({ selected }) =>
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 focus-visible:outline-none ' +
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
          {tabs.map(({ Component, label, data }, idx) => {
            return (
              <Tab.Panel
                key={label}
                className="p-3 text-black bg-white rounded-lg shadow-[0_0_10px_0] shadow-black/60"
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
