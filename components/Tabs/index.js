import { Tab } from '@headlessui/react';

export default function Tabs({ tabs }) {
  return (
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
  );
}
