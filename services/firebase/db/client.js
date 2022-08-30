import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import normalizeExpense from '../../../utils/normalizeExpense';
import normalizeGroup from '../../../utils/normalizeGroup';
import { db } from '../client';

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
