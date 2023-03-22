import axiosInstanse from './axios-instance'

export const getStudent = () => axiosInstanse.get('/getusers')