import { db } from '../client';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import normalizeGroup from '../../../utils/normalizeGroup';
import normalizeExpense from '../../../utils/normalizeExpense';

const getExpense = async (id) => {
  // Get expense ref and check if exists
  const expenseRef = doc(db, 'expenses', id);
  const expenseSnap = await getDoc(expenseRef);
  if (!expenseSnap.exists()) {
    return false;
  }
  return expenseRef;
};

export const addGroup = async (group) => {
  console.log('addGroup', { group });
  const groupsCollection = collection(db, 'groups');
  const docRef = await addDoc(groupsCollection, {
    ...group,
    createdAt: Timestamp.fromDate(new Date()),
  });

  const data = (await getDoc(docRef)).data();

  return {
    id: docRef.id,
    ...data,
    createdAt: data.createdAt.toDate(),
  };
};

export const getGroups = async () => {
  const groupsCollection = collection(db, 'groups');
  const expensesCollection = collection(db, 'expenses');
  const groups = await getDocs(groupsCollection);
  return await Promise.all(
    groups.docs.map(async (group) => {
      const groupData = group.data();
      const groupId = group.id;
      const expensesQuery = query(
        expensesCollection,
        where('group', '==', groupId)
      );
      const expensesRef = await getDocs(expensesQuery);

      const expenses = expensesRef.docs.map((expense) => {
        const data = expense.data();
        const id = expense.id;
        return {
          id,
          ...data,
          createdAt: data.createdAt.toDate(),
          payedAt: data.payedAt.toDate(),
        };
      });

      return normalizeGroup({
        id: groupId,
        data: { ...groupData, expenses },
      });
    })
  );
};

export const getGroup = async (id) => {
  const expensesCollection = collection(db, 'expenses');

  const groupRef = doc(db, 'groups', id);
  const groupSnap = await getDoc(groupRef);

  if (groupSnap.exists()) {
    const data = groupSnap.data();
    const expensesQuery = query(expensesCollection, where('group', '==', id));
    const expensesRef = await getDocs(expensesQuery);
    const expenses = expensesRef.docs.map((expense) => {
      const data = expense.data();
      const id = expense.id;
      return normalizeExpense({ id, data });
    });

    return normalizeGroup({ id, data: { ...data, expenses } });
  }

  return null;
};

/* Expenses */

export const addExpense = async ({
  amount,
  description,
  group,
  member,
  payedAt,
}) => {
  const expensesCollection = collection(db, 'expenses');

  const groupRef = doc(db, 'groups', group);
  const groupSnap = await getDoc(groupRef);
  if (!groupSnap.exists()) throw new Error('Grupo no encontrado');

  const docRef = await addDoc(expensesCollection, {
    description,
    member,
    group,
    amount,
    payedAt: Timestamp.fromDate(new Date(payedAt)),
    createdAt: Timestamp.fromDate(new Date()),
  });

  const data = (await getDoc(docRef)).data();
  const id = docRef.id;

  return normalizeExpense({ id, data });
};

export const editExpense = async ({
  id,
  amount,
  description,
  payedAt,
  member,
}) => {
  // Get expense ref and check if exists
  const expenseRef = await getExpense(id);
  if (!expenseRef) {
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

  await setDoc(expenseRef, updatedValues, { merge: true });

  const data = (await getDoc(expenseRef)).data();
  return normalizeExpense({ id, data });
};

export const deleteExpense = async (id) => {
  // Get expense ref and check if exists
  const expenseRef = await getExpense(id);
  console.log({ expenseRef });
  if (!expenseRef) {
    const error = new Error('Gasto no encontrado');
    error.status = 404;
    throw error;
  }

  await deleteDoc(expenseRef);

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
  // Get expense ref and check if exists
  const groupRef = doc(db, 'groups', id);
  const groupSnap = await getDoc(groupRef);
  if (!groupSnap.exists()) {
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

  await setDoc(groupRef, updatedValues, { merge: true });

  const data = (await getDoc(groupRef)).data();
  return normalizeGroup({ id, data });
};

export const storeDbUser = async (user) => {
  await setDoc(doc(db, 'users', user.id), {
    ...user,
    lastLogin: Timestamp.fromDate(new Date()),
  });

  const docRef = doc(db, 'users', user.id);
  const data = (await getDoc(docRef)).data();

  return {
    id: docRef.id,
    ...data,
  };
};
