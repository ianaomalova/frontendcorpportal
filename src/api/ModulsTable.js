import axiosInstanse from './axios-instance'

export const getStudent = () => axiosInstanse.get('/getusers')
export const getAuth = ({ login, password }) => axiosInstanse.get('/authorization', { params: { login, password } });
