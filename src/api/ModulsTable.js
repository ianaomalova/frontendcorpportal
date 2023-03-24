import axiosInstanse from './axios-instance'

//сервера коли
// export const getStudent = () => axiosInstanse.get('/getusers')
// export const getAuth = ({ login, password }) => axiosInstanse.get('/authorization', { params: { login, password } });

//мои сервера
export const getDisciplines = () => axiosInstanse.get('/disciplines')
export const getStudent = (group) => axiosInstanse.get('/students', {params: {group}})
export const getHeaders = () => axiosInstanse.get('/headers')
export const getGroups = () => axiosInstanse.get('/groups')
export  const getAuth = ({login, password}) => axiosInstanse.get('/login', {params: {login, password}})
export const sendStudents = ({students, group}) => axiosInstanse.post('/students', {params: {students, group}})

