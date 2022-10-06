import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import Button from '../../src/components/Button';
import Typed from '../../src/components/Typed';
import UserPreferences from '../../src/components/UserPreferences';

const tabs = [
  {
    name: 'General',
    Container: UserPreferences
  }
];

export default function SettigsPage () {
  const [selectedTab, setSelectedTab] = useState(0);

  const SelectedTab = useMemo(() => tabs[selectedTab].Container, [selectedTab]);

  return (
    <div className="p-4 mx-auto xl:mx-56 h-fit">
      <h1 className="mx-auto mb-8 text-2xl font-semibold text-center md:text-3xl w-fit">
        <Typed
          gradientColor
          color="orange"
          bold
          texts={['Preferencias']}
          cursor=""
        />
      </h1>
      <div className="flex flex-row items-stretch h-full gap-8">
        <div className="flex flex-col gap-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={
                '!w-full rounded-lg px-4 py-2 duration-300 hover:bg-zinc-700 hover:text-white transition-colors text-left whitespace-nowrap' +
                (index === selectedTab ? ' text-white' : ' text-zinc-400')
              }
              onClick={() => setSelectedTab(index)}
            >
              {tab.name}
            </button>
          ))}
          <Button
            className="!w-full justify-center whitespace-nowrap"
            color="red"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            Cerrar sesión
          </Button>
        </div>
        <div className="w-full">
          <SelectedTab />
        </div>
      </div>
    </div>
  );
}
