import { ArrowLeftIcon, Cog8ToothIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { bindUserToMember, updateGroup } from '../../../services/groups';
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
import { FaHistory } from 'react-icons/fa';
import Dots from '../Loading/Dots';
import useGroup from '../../hooks/useGroup';
import useGroupMovements from '../../hooks/useGroupMovements';
import { useRouter } from 'next/router';

export default function Group() {
  const router = useRouter();
  const {
    user: { id: userId }
  } = useAuth();
  const [group, setGroup] = useGroup();
  const [movements, setMovements] = useGroupMovements();
  const [members, setMembers] = useState(
    group?.members.sort((a, b) => {
      if (a.uid === userId) return -1;
      if (b.uid === userId) return 1;
      return 0;
    })
  );
  const [showConfig, setShowConfig] = useState(false);
  const [userMember, setUserMember] = useState(
    members?.find((m) => m.uid === userId)?.id
  );
  const { closeShareModal, openShareModal, shareModalOpen, ShareModal } =
    useShareModal();

  useEffect(() => {
    if (group === undefined) router.push('/');
  }, [group, router]);

  useEffect(() => {
    if (group) {
      setMembers(group.members);
      if (members === undefined)
        setUserMember(group.members.find((m) => m.uid === userId)?.id);
    }
  }, [group, members, userId]);

  const onUpdate = (updatedGroup) => {
    setGroup({ ...group, ...updatedGroup });
  };

  const onMovementUpdate = (movements) => setMovements(movements);

  const updateMembers = async (members) => {
    const promise = updateGroup(group.id, { members });
    return toast.promise(promise, {
      success: 'Se ha actualizado el grupo',
      error: 'No se ha podido actualizar el grupo',
      pending: 'Actualizando grupo...'
    });
  };

  const handleBindUserToMember = (memberId) => {
    const promise = bindUserToMember({
      group: group.id,
      user: userId,
      member: memberId
    });

    toast
      .promise(promise, {
        success: '¡Vinculado correctamente! 🔗',
        error: '¡Ha ocurrido un error! ❌',
        pending: 'Vinculando...'
      })
      .then((res) => res.data)
      .then((updatedGroup) => {
        const { members } = updatedGroup;
        setGroup({ ...group, members });
        setMembers(members);
        setUserMember(members.find((m) => m.uid === userId)?.id);
      })
      .catch((err) => {
        console.error({ err });
        toast.error(err.response.data.error);
      });
  };

  const toggleConfig = () => setShowConfig(!showConfig);

  const tabs = [
    {
      label: 'Movimientos',
      Component: MovementsPanel,
      data: { movements, members, onMovementUpdate }
    },
    {
      label: 'Saldo',
      Component: BalancePanel,
      data: { movements, members, onMovementUpdate }
    }
  ];

  return !group || members === undefined ? (
    <Dots />
  ) : (
    <>
      <ShareModal
        group={group}
        open={shareModalOpen}
        onClose={closeShareModal}
        url={typeof window !== 'undefined' && window.location.href}
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
            <Button color="orange">
              <FaHistory className="w-5 h-5" />
              <span className="hidden md:block">Historial</span>
            </Button>
            <Button color="orange" onClick={openShareModal}>
              <ArrowTopRightOnSquareIcon className="w-5 h-5" />
              <span className="hidden md:block">Compartir</span>
            </Button>
            <Button color="orange" className="group" onClick={toggleConfig}>
              <ArrowLeftIcon
                className={
                  'w-5 h-5 absolute transition-transform group-hover:-translate-x-0.5 ' +
                  (!showConfig ? 'scale-0' : 'scale-100')
                }
              />
              <Cog8ToothIcon
                className={
                  'w-5 h-5 transition-transform group-hover:rotate-360 ' +
                  (showConfig ? 'scale-0' : 'scale-100')
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
