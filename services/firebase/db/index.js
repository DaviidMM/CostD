import { db } from '../client';
import {
  addDoc,
  collection,
  getDocs,
  Timestamp,
  getDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';

export const addGroup = async (group) => {
  try {
    const docRef = await addDoc(collection(db, 'groups'), {
      ...group,
      createdAt: Timestamp.fromDate(new Date()),
    });

    const data = (await getDoc(docRef)).data();

    return {
      id: docRef.id,
      ...data,
      createdAt: data.createdAt.toDate(),
    };
  } catch (err) {
    console.error(err);
  }
};

export const getGroups = async () => {
  try {
    const groups = await getDocs(collection(db, 'groups'));
    return groups.docs.map((group) => {
      const data = group.data();
      const id = group.id;
      return {
        id,
        ...data,
        createdAt: data.createdAt.toDate(),
      };
    });
  } catch (err) {
    console.error(err);
  }
};

export const getGroup = async (id) => {
  try {
    const docSnap = await getDoc(doc(db, 'groups', id));

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id,
        ...data,
        createdAt: data.createdAt.toDate(),
      };
    }

    return null;
  } catch (err) {
    console.error(err);
  }
};

export const addCost = async ({ group, member, amount, payedAt }) => {
  try {
    const docRef = await addDoc(collection(db, 'costs'), {
      group,
      member,
      amount,
      payedAt,
      createdAt: Timestamp.fromDate(new Date()),
    });

    console.log({ docRef });

    return {
      id: docRef.id,
    };
  } catch (err) {
    console.error(err);
  }
};

export const getGroupCosts = async (id) => {
  try {
    const q = query(collection(db, 'costs'), where('group', '==', id));
    const snapshot = await getDocs(q);
    console.log({ snapshot });
    const costs = [];
    snapshot.forEach((cost) => {
      const data = cost.data();
      const id = cost.id;

      console.log({ data, id });
      costs.push({
        id,
        ...data,
        createdAt: data.createdAt.toDate(),
      });
    });
    return costs;
  } catch (err) {
    console.error(err);
  }
};
