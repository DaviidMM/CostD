import {
  ArrowLeftIcon,
  Cog8ToothIcon,
  ShareIcon,
} from '@heroicons/react/24/solid';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { bindUserToMember, updateGroup } from '../../services/groups';
import BalancePanel from '../BalancePanel';
import Button from '../Button';
import CategoryItem from '../CategorySelector/CategoryItem';
import MovementsPanel from '../MovementsPanel';
import GroupConfig from '../GroupConfig';
import MemberPicker from '../MemberPicker';
import Tabs from '../Tabs';
import Typed from '../Typed';
import useShareModal from '../../hooks/useShareModal';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

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

  const { closeShareModal, openShareModal, shareModalOpen, ShareModal } =
    useShareModal();

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
      data: { movements: group.movements, members, onMovementUpdate },
    },
  ];

  return (
    <>
      <ShareModal
        group={group}
        open={shareModalOpen}
        onClose={closeShareModal}
        url={typeof windows !== undefined && window.location.href}
      />
      <div className="relative z-20 p-4 mx-auto border-2 border-orange-600 rounded-lg shadow-md xl:mx-56 h-fit">
        <header className="relative pb-2 mb-4 border-b-2 border-orange-600">
          <div className="absolute top-0 left-0 flex flex-col w-1/5 max-w-xs">
            <CategoryItem
              category={group.category}
              className="hidden md:block"
              selected
            />
            <CategoryItem
              category={group.category.substring(0, 2)}
              className="block md:hidden"
              selected
            />
            {userMember && (
              <small
                className="hidden overflow-hidden md:block whitespace-nowrap text-ellipsis"
                title={
                  'Registrado como ' +
                  members.find((m) => m.id === userMember).name
                }
              >
                Registrado como{' '}
                <b>{members.find((m) => m.id === userMember).name}</b>
              </small>
            )}
          </div>
          <h1 className="mx-auto text-2xl font-semibold text-center md:text-3xl w-fit">
            <Typed
              gradientColor
              color="orange"
              bold
              texts={[group.name]}
              cursor=""
            />
          </h1>
          <div className="absolute top-0 right-0 flex flex-row gap-2">
            <Button color="orange" onClick={openShareModal}>
              <ArrowTopRightOnSquareIcon className="w-5 h-5" />
              <span className="hidden md:block">Compartir</span>
            </Button>
            <Button
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
          </div>
          <p className="mt-8 text-justify text-white">
            <Typed texts={[group.description]} cursor="" typeSpeed={10} />
          </p>
        </header>

        {!userMember ? (
          <div>
            <h2 className="mb-4 text-xl font-semibold">¿Quién eres?</h2>
            <MemberPicker members={members} onSelect={handleBindUserToMember} />
          </div>
        ) : showConfig ? (
          <GroupConfig
            bindUserToMember={handleBindUserToMember}
            group={group}
            members={members}
            onUpdate={onUpdate}
            setMembers={setMembers}
            updateMembers={updateMembers}
          />
        ) : (
          <div className="flex flex-col justify-between">
            <Tabs tabs={tabs} selectedIndex={0} />
          </div>
        )}
      </div>
    </>
  );
}
