import { Tab } from '@headlessui/react';

export default function Tabs({ tabs }) {
  return (
    <Tab.Group>
      <Tab.List className="flex p-1 mt-4 space-x-1 text-black bg-gradient-to-br from-orange-500 via-orange-500 to-rose-500 rounded-xl">
        {tabs.map((tab) => {
          return (
            <Tab
              key={tab.label}
              className={({ selected }) =>
                'w-full rounded-lg py-2.5 text-sm font-semibold leading-5 focus-visible:outline-none transition-colors ' +
                (selected
                  ? 'bg-white text-orange-700'
                  : 'text-white hover:bg-white/20')
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
              className="p-3 bg-gradient-to-br from-zinc-600 via-zinc-800 to-zinc-700 rounded-lg shadow-[0_0_10px_0] shadow-black/60"
            >
              <Component {...data} />
            </Tab.Panel>
          );
        })}
      </Tab.Panels>
    </Tab.Group>
  );
}
