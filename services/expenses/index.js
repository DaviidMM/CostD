import axios from 'axios';

export const modifyExpense = async ({
  id,
  description,
  amount,
  member,
  payedAt,
}) => {
  return axios
    .put(`/api/expenses/${id}`, { description, amount, member, payedAt })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log({ err });
    });
};
