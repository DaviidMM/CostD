import { ArrowLeftIcon, Cog8ToothIcon } from '@heroicons/react/24/solid';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { bindUserToMember, updateGroup } from '../../services/groups';
import BalancePanel from '../BalancePanel';
import Button from '../Button';
import CategoryItem from '../CategorySelector/CategoryItem';
import MovementsPanel from '../MovementsPanel';
import GroupConfig from '../GroupConfig';
import MemberSelector from '../MemberSelector';
import Tabs from '../Tabs';
import Typed from '../Typed';

export default function Group(initialGroup) {
  const {
    user: { id: userId },
  } = useAuth();
  const [group, setGroup] = useState(initialGroup);
  const [members, setMembers] = useState(
    group.members.sort((a, b) => {
      if (a.uid === userId) return -1;
      if (b.uid === userId) return 1;
      return 0;
    })
  );
  const [showConfig, setShowConfig] = useState(false);
  const [animateIcon, setAnimateIcon] = useState(false);
  const [userMember, setUserMember] = useState(
    members.find((m) => m.uid === userId)?.id
  );

  const onUpdate = (updatedGroup) => {
    setGroup({ ...group, ...updatedGroup });
  };

  const onMovementUpdate = (movements) => setGroup({ ...group, movements });

  const updateMembers = async (members) => {
    const promise = updateGroup(group.id, { members });
    return toast
      .promise(promise, {
        success: 'Se ha actualizado el grupo',
        error: 'No se ha podido actualizar el grupo',
        pending: 'Actualizando grupo...',
      })
      .then((updatedGroup) => setMembers(updatedGroup.members));
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
      label: 'Movimientos',
      Component: MovementsPanel,
      data: { movements: group.movements, members, onMovementUpdate },
    },
    {
      label: 'Saldo',
      Component: BalancePanel,
      data: { movements: group.movements, members },
    },
  ];

  return !userMember ? (
    <div>
      ¡No estás asociado a ningún miembro del grupo! 💀
      <MemberSelector members={members} onSelect={handleBindUserToMember} />
    </div>
  ) : (
    <div className="relative p-4 mx-auto mt-10 border-2 border-orange-600 rounded-lg shadow-md h-fit">
      <header className="relative pb-8 mb-4 border-b-2 border-orange-600">
        <div className="absolute top-0 left-0 flex flex-col w-1/5 max-w-xs">
          <CategoryItem category={group.category} selected />
          <small className="overflow-hidden whitespace-nowrap text-ellipsis">
            Registrado como{' '}
            <b>{members.find((m) => m.id === userMember).name}</b>
          </small>
        </div>
        <h1 className="mx-auto text-3xl font-semibold text-center w-fit">
          <Typed
            gradientColor
            color="orange"
            bold
            text={group.name}
            cursor=""
          />
        </h1>
        <Button
          className="absolute top-0 right-0"
          color="orange"
          onClick={toggleConfig}
          onMouseEnter={toggleAnimation}
          onMouseLeave={toggleAnimation}
        >
          <ArrowLeftIcon
            className={
              'w-5 h-5 transition-transform absolute' +
              ' ' +
              (!showConfig ? 'scale-0' : 'scale-100') +
              ' ' +
              (animateIcon ? '-translate-x-0.5' : 'translate-x-0')
            }
          />
          <Cog8ToothIcon
            className={
              'w-5 h-5 transition-transform' +
              ' ' +
              (showConfig ? 'scale-0' : 'scale-100') +
              ' ' +
              (animateIcon ? 'rotate-360' : 'rotate-0')
            }
          />
        </Button>
      </header>

      {showConfig ? (
        <GroupConfig
          bindUserToMember={handleBindUserToMember}
          group={group}
          members={members}
          onUpdate={onUpdate}
          setMembers={setMembers}
          updateMembers={updateMembers}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-justify text-white">
            <Typed text={group.description} cursor="" typeSpeed={10} />
          </p>
          <Tabs tabs={tabs} selectedIndex={1} />
        </div>
      )}
    </div>
  );
}
