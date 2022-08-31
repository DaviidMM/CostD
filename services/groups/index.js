import axios from 'axios';

export const createGroup = async ({ name, description, category, members }) => {
  const { data } = await axios.post('/api/groups', {
    name,
    description,
    category,
    members,
  });
  return data;
};

export const updateGroup = async (
  id,
  { name, description, category, members }
) => {
  const updatedFields = { name, description, category, members };
  const { data } = await axios.put(`/api/groups/${id}`, updatedFields);
  return data;
};

export const bindUserToMember = ({ group, user, member }) => {
  return axios.put(`/api/groups/${group}/bind`, { user, member });
};
