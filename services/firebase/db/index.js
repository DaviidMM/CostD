import { db } from '../client';
import {
  addDoc,
  collection,
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

const groupsCollection = collection(db, 'groups');
const expensesCollection = collection(db, 'expenses');

export const addGroup = async (group) => {
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

export const addExpense = async ({
  amount,
  description,
  group,
  member,
  payedAt,
}) => {
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
  const expenseRef = doc(db, 'expenses', id);
  const expenseSnap = await getDoc(expenseRef);
  if (!expenseSnap.exists()) {
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
