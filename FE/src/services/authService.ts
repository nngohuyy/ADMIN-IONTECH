import axiosClient from '@/utils/axiosClient';

export const login = (data: { email: string; password: string }) =>
  axiosClient.post('/auth/login', data);

export const register = (data: { name: string; email: string; password: string }) =>
  axiosClient.post('/auth/register', data);

export const getMe = () => axiosClient.get('/auth/me');

export const updateProfile = (data: {
  name?: string;
  email?: string;
  phoneNumber?: string;
  avatar?: string;
  gender?: string;
  dob?: string;
}) => axiosClient.put('/auth/update-profile', data);
export const changePassword = (data: {
  oldPassword: string;
  newPassword: string;
}) => axiosClient.put('/auth/change-password', data);
export const deleteAccount = () => axiosClient.delete('/auth/delete');

export const loginWithGoogle = (googleToken: string) => {
  return axiosClient.post('/auth/google-login', { googleToken });
};