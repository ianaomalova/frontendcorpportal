import axiosInstanse from './axios-instance'

//сервера коли
// export const getStudent = () => axiosInstanse.get('/getusers')
// export const getAuth = ({ login, password }) => axiosInstanse.get('/authorization', { params: { login, password } });

//мои сервера
export const getDisciplines = () => axiosInstanse.get('/disciplines')
export const getStudent = () => axiosInstanse.get('/students')
export const getHeaders = () => axiosInstanse.get('/headers')
export const getGroups = () => axiosInstanse.get('/groups')
export  const getAuth = ({login, password}) => axiosInstanse.get('/login', {params: {login, password}})
export const sendStudents = (students) => axiosInstanse.post('/students', students)

