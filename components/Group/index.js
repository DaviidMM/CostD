import { Tab } from '@headlessui/react';
import { ArrowLeftIcon, CogIcon, XIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { bindUserToMember, updateGroup } from '../../services/groups';
import BalancePanel from '../BalancePanel';
import Button from '../Button';
import CategoryItem from '../CategorySelector/CategoryItem';
import ExpensesPanel from '../ExpensesPanel';
import GroupConfig from '../GroupConfig';
import MemberSelector from '../MemberSelector';
import Tabs from '../Tabs';
import Typed from '../Typed';

export default function Group(initialGroup) {
  const {
    user: { id: userId },
  } = useAuth();
  const [group, setGroup] = useState(initialGroup);
  const [members, setMembers] = useState(group.members);
  const [showConfig, setShowConfig] = useState(false);
  const [animateIcon, setAnimateIcon] = useState(false);
  const [userMember, setUserMember] = useState(
    members.find((m) => m.uid === userId)?.id
  );

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

  const handleBindUserToMember = (memberId) => {
    const promise = bindUserToMember({
      group: group.id,
      user: userId,
      member: memberId,
    });

    toast
      .promise(promise, {
        success: '¡Vinculado correctamente! 🔗',
        error: '¡Ha ocurrido un error! ❌',
        pending: 'Vinculando...',
      })
      .then((res) => res.data)
      .then((updatedGroup) => {
        const { members } = updatedGroup;
        setGroup({ ...group, members });
        setMembers(members);
        setUserMember(members.find((m) => m.uid === userId)?.id);
      })
      .catch((err) => {
        console.log({ err });
        toast.error(err.response.data.error);
      });
  };

  const toggleAnimation = () => setAnimateIcon(!animateIcon);
  const toggleConfig = () => setShowConfig(!showConfig);

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

  return !userMember ? (
    <div>
      ¡No estás asociado a ningún miembro del grupo! 💀
      <MemberSelector members={members} onSelect={handleBindUserToMember} />
    </div>
  ) : (
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
          <div className="pb-8 border-b border-orange-600">
            <div className="absolute flex flex-col left-4 top-4">
              <CategoryItem category={group.category} />
              <small>
                Registrado como{' '}
                <b>{members.find((m) => m.id === userMember).name}</b>
              </small>
            </div>
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
