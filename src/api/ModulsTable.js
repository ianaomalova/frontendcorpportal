import axiosInstanse from './axios-instance'

//сервера коли

//export const getAuth = ({ login, password }) => axiosInstanse.post('/post_authorization', { login: login, password: password});
export const getSubjects = ({FIO}) => axiosInstanse.get('get_subjects', {params: {FIO}});
export const getTeams = ({subject_name}) => axiosInstanse.get('get_teams', {params: {subject_name}});
export const getStudent = ({group_name}) => axiosInstanse.get('get_users', {params: {group_name}});

//мои сервера
// export const getDisciplines = () => axiosInstanse.get('/disciplines')
// export const getStudent = (group) => axiosInstanse.get('/students', {params: {group}})
// export const getHeaders = () => axiosInstanse.get('/headers')
// export const getGroups = () => axiosInstanse.get('/groups')
export  const getAuth = ({login, password}) => axiosInstanse.post('/login', {login: login, password: password})
// export const sendStudents = ({students, group}) => axiosInstanse.post('/students', {params: {students, group}})

