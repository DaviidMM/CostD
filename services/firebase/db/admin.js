import { db } from '../admin';
import normalizeGroup from '../../../utils/normalizeGroup';
import normalizeMovement from '../../../utils/normalizeMovement';
import { Timestamp } from 'firebase-admin/firestore';

export const addGroup = async (group) => {
  const doc = await db.collection('groups').add({
    category: group.category,
    description: group.description,
    name: group.name,
    members: group.members.map((m) => ({
      id: m.id,
      name: m.name,
      uid: m.uid || '',
    })),
    createdAt: Timestamp.fromDate(new Date()),
  });

  const addedDoc = await doc.get();

  return normalizeGroup({ id: doc.id, data: addedDoc.data() });
};

/* Movements */

export const addMovement = async ({
  amount,
  description,
  group,
  member,
  payedAt,
  type,
}) => {
  const doc = await db.collection('movements').add({
    amount,
    description,
    group,
    member,
    payedAt: Timestamp.fromDate(new Date(payedAt)),
    type,
    createdAt: Timestamp.fromDate(new Date()),
  });

  const addedDoc = await doc.get();

  return normalizeMovement({ id: doc.id, data: addedDoc.data() });
};

export const editMovement = async ({
  amount,
  description,
  id,
  member,
  payedAt,
  type,
}) => {
  const movement = await db.collection('movements').doc(id).get();
  if (!movement.exists) {
    const error = new Error('Gasto no encontrado');
    error.status = 404;
    throw error;
  }

  const updatedValues = {
    amount,
    description,
    group: undefined,
    member,
    payedAt: payedAt ? Timestamp.fromDate(new Date(payedAt)) : undefined,
    type,
  };

  // Remove undefined values from updatedValues
  Object.keys(updatedValues).forEach((key) => {
    if (updatedValues[key] === undefined) delete updatedValues[key];
  });

  await db.collection('movements').doc(id).update(updatedValues);

  const updatedDoc = await db.collection('movements').doc(id).get();

  return normalizeMovement({
    id,
    data: updatedDoc.data(),
  });
};

export const deleteMovement = async (id) => {
  const movement = await db.collection('movements').doc(id).get();
  if (!movement.exists) {
    const error = new Error('Gasto no encontrado');
    error.status = 404;
    throw error;
  }

  await db.collection('movements').doc(id).delete();
  return true;
};

/* End Movements */

export const editGroup = async ({
  id,
  name,
  description,
  category,
  members,
}) => {
  const group = await db.collection('groups').doc(id).get();
  if (!group.exists) {
    const error = new Error('Grupo no encontrado');
    error.status = 404;
    throw error;
  }

  const updatedValues = {
    category,
    description,
    members: members.map((m) => ({ id: m.id, name: m.name, uid: m.uid || '' })),
    name,
  };

  // Remove undefined values from updatedValues
  Object.keys(updatedValues).forEach((key) => {
    if (updatedValues[key] === undefined) delete updatedValues[key];
  });

  await db.collection('groups').doc(id).update(updatedValues);

  const updatedDoc = await db.collection('groups').doc(id).get();

  return normalizeGroup({
    id,
    data: updatedDoc.data(),
  });
};

export const bindUserToMember = async ({ group, user, member }) => {
  const docRef = db.collection('groups').doc(group);
  const doc = await docRef.get();
  if (!doc.exists) {
    const error = new Error('Grupo no encontrado');
    error.status = 404;
    throw error;
  }

  const { members } = doc.data();

  const updatedMembers = members.map((m) =>
    m.id === member
      ? { ...m, uid: user }
      : m.uid === user
      ? { ...m, uid: '' }
      : m
  );

  await docRef.update({ members: updatedMembers });

  const updatedDoc = await docRef.get();

  return normalizeGroup({
    id: doc.id,
    data: updatedDoc.data(),
  });
};

export const storeDbUser = async ({ avatar, displayName, email, id }) => {
  const docRef = await db.collection('users').doc(id);
  await docRef.set({
    avatar,
    displayName,
    email,
    id,
    lastLogin: Timestamp.fromDate(new Date()),
  });

  const addedDoc = await docRef.get();

  return {
    ...addedDoc.data(),
    id: docRef.id,
  };
};
