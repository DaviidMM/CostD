import api from '../api';

export const createGroup = async ({ name, description, category, members }) => {
  const { data } = await api.post('/groups', {
    name,
    description,
    category,
    members
  });
  return data;
};

export const updateGroup = async (
  id,
  { name, description, category, members }
) => {
  const updatedFields = { name, description, category, members };
  const { data } = await api.put(`/groups/${id}`, updatedFields);
  return data;
};

export const bindUserToMember = ({ group, user, member }) => {
  return api.put(`/groups/${group}/bind`, { user, member });
};
