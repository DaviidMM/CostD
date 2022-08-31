import { db } from '../admin';
import normalizeGroup from '../../../utils/normalizeGroup';
import normalizeExpense from '../../../utils/normalizeExpense';
import { Timestamp } from 'firebase-admin/firestore';

export const addGroup = async (group) => {
  const doc = await db.collection('groups').add({
    category: group.category,
    description: group.description,
    name: group.name,
    members: group.members.map((m) => ({ ...m, uid: '' })),
    createdAt: Timestamp.fromDate(new Date()),
  });

  const addedDoc = await doc.get();

  return normalizeGroup({ id: doc.id, data: addedDoc.data() });
};

/* Expenses */

export const addExpense = async ({
  amount,
  description,
  group,
  member,
  payedAt,
}) => {
  const doc = await db.collection('expenses').add({
    amount,
    description,
    group,
    member,
    payedAt: Timestamp.fromDate(new Date(payedAt)),
    createdAt: Timestamp.fromDate(new Date()),
  });

  const addedDoc = await doc.get();

  return normalizeExpense({ id: doc.id, data: addedDoc.data() });
};

export const editExpense = async ({
  id,
  amount,
  description,
  payedAt,
  member,
}) => {
  const expense = await db.collection('expenses').doc(id).get();
  if (!expense.exists) {
    const error = new Error('Gasto no encontrado');
    error.status = 404;
    throw error;
  }

  const updatedValues = {
    description,
    amount,
    payedAt: payedAt ? Timestamp.fromDate(new Date(payedAt)) : undefined,
    member,
    group: undefined,
  };

  // Remove undefined values from updatedValues
  Object.keys(updatedValues).forEach((key) => {
    if (updatedValues[key] === undefined) delete updatedValues[key];
  });

  await db.collection('expenses').doc(id).update(updatedValues);

  const updatedDoc = await db.collection('expenses').doc(id).get();

  return normalizeExpense({
    id,
    data: updatedDoc.data(),
  });
};

export const deleteExpense = async (id) => {
  const expense = await db.collection('expenses').doc(id).get();
  if (!expense.exists) {
    const error = new Error('Gasto no encontrado');
    error.status = 404;
    throw error;
  }

  await db.collection('expenses').doc(id).delete();
  return true;
};

/* End Expenses */

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
    members,
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
    m.id === member ? { ...m, uid: user } : m
  );

  await docRef.update({ members: updatedMembers });

  const updatedDoc = await docRef.get();

  return normalizeGroup({
    id: doc.id,
    data: updatedDoc.data(),
  });
};
