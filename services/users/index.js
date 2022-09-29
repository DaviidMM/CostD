import api from '../api';
export const storeFCMToken = (FCMToken) => {
  return api.post('/users/devices', { token: FCMToken });
};

export const getUserPrefs = async () => {
  return api.get('/users/preferences').then((res) => res.data);
};

export const updateUserPrefs = ({ preference, value }) => {
  return api.put('/users/preferences', { preference, value });
};
