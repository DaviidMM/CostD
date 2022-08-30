import { Tab } from '@headlessui/react';
import { ArrowLeftIcon, CogIcon, XIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateGroup } from '../../services/groups';
import BalancePanel from '../BalancePanel';
import Button from '../Button';
import CategoryItem from '../CategorySelector/CategoryItem';
import ExpensesPanel from '../ExpensesPanel';
import GroupConfig from '../GroupConfig';
import Tabs from '../Tabs';
import Typed from '../Typed';

export default function Group(initialGroup) {
  const [group, setGroup] = useState(initialGroup);
  const [members, setMembers] = useState(group.members);
  const [showConfig, setShowConfig] = useState(false);
  const [animateIcon, setAnimateIcon] = useState(false);

  const onUpdate = (updatedGroup) => {
    setGroup({ ...group, ...updatedGroup });
  };

  const updateMembers = async (members) => {
    const promise = updateGroup(id, { members });
    return toast.promise(promise, {
      success: 'Se ha actualizado el grupo',
      error: 'No se ha podido actualizar el grupo',
      pending: 'Actualizando grupo...',
    });
  };

  const tabs = [
    {
      label: 'Gastos',
      Component: ExpensesPanel,
      data: { expenses: group.expenses, members },
    },
    {
      label: 'Saldo',
      Component: BalancePanel,
      data: {},
    },
  ];

  const toggleAnimation = () => {
    setAnimateIcon(!animateIcon);
  };
  const toggleConfig = () => setShowConfig(!showConfig);

  console.log({ group });

  return (
    <div className="relative w-2/3 p-4 mx-auto mt-10 border-2 shadow-[0_0_10px_0_black] border-orange-600 rounded-lg xl:w-2/4 h-fit">
      <Button
        className="absolute top-4 right-4"
        onClick={toggleConfig}
        onMouseEnter={toggleAnimation}
        onMouseLeave={toggleAnimation}
      >
        <ArrowLeftIcon
          className={
            'w-5 h-5 transition-all absolute' +
            ' ' +
            (!showConfig ? 'scale-0' : 'scale-100') +
            ' ' +
            (animateIcon ? '-translate-x-0.5' : 'translate-x-0')
          }
        />
        <CogIcon
          className={
            'w-5 h-5 transition-all' +
            ' ' +
            (showConfig ? 'scale-0' : 'scale-100') +
            ' ' +
            (animateIcon ? 'rotate-360' : 'rotate-0')
          }
        />
      </Button>

      {showConfig ? (
        <GroupConfig
          group={group}
          members={members}
          onUpdate={onUpdate}
          setMembers={setMembers}
          updateMembers={updateMembers}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <CategoryItem
              category={group.category}
              className="absolute left-4 top-4"
            />
            <h1 className="text-3xl font-semibold text-center grow">
              <Typed bold text={group.name} cursor="" />
            </h1>
          </div>
          <p className="text-justify">
            <Typed text={group.description} cursor="" typeSpeed={10} />
          </p>
          <Tabs tabs={tabs} />
        </div>
      )}
    </div>
  );
}
