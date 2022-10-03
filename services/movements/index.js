import api from '../api';

export const createMovement = async ({
  amount,
  description,
  group,
  member,
  participants,
  payedAt,
  type
}) => {
  return api
    .post('/movements', {
      amount,
      description,
      group,
      member,
      participants,
      payedAt,
      type
    })
    .then((res) => res.data);
};

export const modifyMovement = async ({
  amount,
  description,
  id,
  member,
  participants,
  payedAt,
  type
}) => {
  return api
    .put(`/movements/${id}`, {
      description,
      amount,
      member,
      participants,
      payedAt,
      type
    })
    .then((res) => res.data);
};

export const deleteMovement = async (movement) => {
  return api.delete(`/movements/${movement.id}`);
};
