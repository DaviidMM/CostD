import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import normalizeMovement from '../../../utils/normalizeMovement';
import normalizeGroup from '../../../utils/normalizeGroup';
import { db, auth } from '../client';

export const getGroups = async (user) => {
  const {
    currentUser: { uid }
  } = auth;
  const userGroups = (await getDoc(doc(db, 'users', uid))).data().groups || [];

  if (!userGroups.length) return [];

  const groupsCollection = collection(db, 'groups');
  const movementsCollection = collection(db, 'movements');
  const groups = await getDocs(
    query(groupsCollection, where(documentId(), 'in', userGroups))
  );

  return await Promise.all(
    groups.docs.map(async (group) => {
      const groupData = group.data();
      const groupId = group.id;
      const movementsQuery = query(
        movementsCollection,
        where('group', '==', groupId)
      );
      const movementsRef = await getDocs(movementsQuery);

      const movements = movementsRef.docs
        .map((movement) => {
          const data = movement.data();
          const id = movement.id;
          return {
            id,
            ...data,
            createdAt: data.createdAt.toDate(),
            payedAt: data.payedAt.toDate()
          };
        })
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        });

      return normalizeGroup({
        id: groupId,
        data: { ...groupData, movements }
      });
    })
  );
};

export const getGroup = async (id) => {
  const movementsCollection = collection(db, 'movements');
  const groupRef = doc(db, 'groups', id);
  const groupSnap = await getDoc(groupRef);

  if (groupSnap.exists()) {
    const data = groupSnap.data();
    const movementsQuery = query(movementsCollection, where('group', '==', id));
    const movementsRef = await getDocs(movementsQuery);
    const movements = movementsRef.docs
      .map((movement) => {
        const data = movement.data();
        const id = movement.id;
        return normalizeMovement({ id, data });
      })
      .sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

    return normalizeGroup({ id, data: { ...data, movements } });
  }

  return null;
};

export const listenGroup = (id, onUpdate) => {
  const groupRef = doc(db, 'groups', id);
  return onSnapshot(groupRef, async (snap) => {
    if (snap.exists()) {
      const groupData = snap.data();
      const group = normalizeGroup({ id, data: groupData });
      onUpdate(group);
    }
  });
};

export const listenGroupMovements = (id, onUpdate) => {
  const movementsRef = collection(db, 'movements');
  const movementsQuery = query(movementsRef, where('group', '==', id));

  return onSnapshot(movementsQuery, (snap) => {
    const movements = snap.docs
      .map((movement) => {
        const data = movement.data();
        const id = movement.id;
        return normalizeMovement({ id, data });
      })
      .sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

    onUpdate(movements);
  });
};
