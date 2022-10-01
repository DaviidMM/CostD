import { db, sendGroupNotification } from '../admin';
import normalizeGroup from '../../../utils/normalizeGroup';
import normalizeMovement from '../../../utils/normalizeMovement';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';

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
  participants,
  payedAt,
  type,
}) => {
  const doc = await db.collection('movements').add({
    amount,
    description,
    group,
    member,
    participants,
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
  participants,
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
    participants,
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
    members: members
      ? members.map((m) => ({ id: m.id, name: m.name, uid: m.uid || '' }))
      : undefined,
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
  const docRef = db.collection('users').doc(id);
  const prevData = (await docRef.get()).data();
  await docRef.set({
    ...prevData,
    avatar,
    displayName,
    email,
    lastLogin: Timestamp.fromDate(new Date()),
  });

  const addedDoc = await docRef.get();

  return {
    ...addedDoc.data(),
    id: docRef.id,
  };
};

export const addDeviceToUser = async ({ uid, token }) => {
  const docRef = db.collection('users').doc(uid);

  const prevData = (await docRef.get()).data();
  const { devices: existingDevices } = prevData;

  if (existingDevices && existingDevices.some((eD) => eD.token === token)) {
    return true;
  }

  await docRef.update({
    devices: FieldValue.arrayUnion({
      token,
      registeredAt: Timestamp.fromDate(new Date()),
    }),
  });

  return true;
};

export const getUserPreferences = async (uid) => {
  const docRef = db.collection('users').doc(uid);
  const doc = await docRef.get();
  if (!doc.exists) {
    const error = new Error('Usuario no encontrado');
    error.status = 404;
    throw error;
  }

  const { preferences } = doc.data();

  return preferences;
};

export const updateUserPreference = async ({ uid, preference, value }) => {
  const docRef = db.collection('users').doc(uid);
  const prevData = (await docRef.get()).data();
  await docRef.set({
    ...prevData,
    preferences: {
      ...prevData.preferences,
      [preference]: value,
    },
  });

  const updatedDoc = await docRef.get();

  return {
    ...updatedDoc.data(),
    id: docRef.id,
  };
};
