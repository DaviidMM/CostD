import axios from 'axios';

export const createExpense = async ({
  amount,
  description,
  group,
  member,
  payedAt,
}) => {
  return axios
    .post('/api/expenses', {
      amount,
      description,
      group,
      member,
      payedAt,
    })
    .then((res) => res.data);
};

export const modifyExpense = async ({
  amount,
  description,
  id,
  member,
  payedAt,
}) => {
  return axios
    .put(`/api/expenses/${id}`, { description, amount, member, payedAt })
    .then((res) => res.data);
};

export const deleteExpense = async (expense) => {
  return axios.delete(`/api/expenses/${expense.id}`);
};
