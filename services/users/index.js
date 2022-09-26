import api from '../api';
export const storeFCMToken = (FCMToken) => {
  return api.post('/users/devices', { token: FCMToken });
};
