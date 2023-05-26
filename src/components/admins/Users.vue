<template>
    <h1>Панель администратора</h1>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">
        Добавить пользователя
    </button>
    <div class="input-group" style="max-width: 300px; margin-bottom: 25px; margin-left: 15px">
        <div class="input-group-prepend">
            <span class="input-group-text"><img src="icons/search_FILL0_wght400_GRAD0_opsz24.png" alt=""></span>
        </div>
        <input type="text" class="form-control w-auto" placeholder="Search..." v-model="searchQuery">
        <select class="form-select w-auto" v-model="filteredType">
            <option value="">Все пользователи</option>
            <option value="Пользователь">Пользователь</option>
            <option value="Суперюзер">Суперюзер</option>
            <option value="Администратор">Администратор</option>
        </select>
    </div>
<!--    <div class="col-sm-4">-->
<!--        <select class="form-select" v-model="filteredType">-->
<!--            <option value="">Все пользователи</option>-->
<!--            <option value="Пользователь">Пользователь</option>-->
<!--            <option value="Суперюзер">Суперюзер</option>-->
<!--            <option value="Администратор">Администратор</option>-->
<!--        </select>-->
<!--    </div>-->
    <div v-if="filteredUsers.length > 0">
        <table class="table table-bordered border-primary" style="max-width: 60%; margin-left: 30px">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>ФИО</th>
                    <th>Роль</th>
                    <th>Логин</th>
                    <th>Пароль</th>
                    <th>Удалить</th>
                    <th>Редактировать</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in filteredUsers" :key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{user.name}}</td>
                    <td v-if="editIndex === index && editNow === true">
                        <select class="form-control w-auto" v-model="user.role">
                            <option value="Пользователь">Пользователь</option>
                            <option value="Суперюзер">Суперюзер</option>
                            <option value="Администратор">Администратор</option>
                        </select>
                    </td>
                    <td v-else>{{user.role}}</td>
                    <td v-if="editIndex === index && editNow === true"><input class="form-control" type="text" v-model="user.login"></td>
                    <td v-else>{{user.login}}</td>
                    <td v-if="editIndex === index && editNow === true"><input class="form-control" type="text" v-model="user.password"></td>
                    <td v-else>{{user.password}}</td>
                    <td><button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="deleteInit(index,user)"><img src="icons/delete_FILL0_wght400_GRAD0_opsz24.png" alt=""></button></td>
                    <td v-if="editNow === false"><button type="button" class="btn"  @click="edit(index)"><img src="icons/edit_FILL0_wght400_GRAD0_opsz24.png" alt=""></button></td>
                    <td v-if="editNow === true"><button type="button" class="btn" @click="save"><img src="icons/check_FILL0_wght400_GRAD0_opsz24.png" alt=""></button></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else><h3>Пользователи не найдены</h3></div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Удалить пользователя</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Вы действительно хотите удалить пользователя <b>{{currentUser.name}}</b>?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="remove(currentIndex)">Удалить</button>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel2">Добавить пользователя</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" placeholder="ФИО: " v-model="newUser.name">
                </div>
                <div class="modal-body">
<!--                    <input type="text" class="form-control" placeholder="Роль: " v-model="newUser.role">-->
                    <select class="form-select w-auto" v-model="newUser.role">
                        <option value="Пользователь">Пользователь</option>
                        <option value="Суперюзер">Суперюзер</option>
                        <option value="Администратор">Администратор</option>
                    </select>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" placeholder="Логин: " v-model="newUser.login">
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" placeholder="Пароль: " v-model="newUser.password">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addUser">Добавить</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                listOfUsers: [
                    { id: '1', name: 'Чеканин В.А.', role: 'Суперюзер', position:'Зав. кафедрой', login: 'ChekaninVA', password: 'qfsghy12HHG' },
                    { id: '2', name: 'Ибатулин М.Ю.', role: 'Пользователь', position:'Зав. кафедрой', login: 'IbatulinMU', password: 'gfgf76OP' },
                    { id: '3', name: 'Бычкова Н.А.', role: 'Пользователь', position:'Зав. кафедрой', login: 'BichkovaNA', password: 'fgfhgfrvdf56hgf' },
                    { id: '4', name: 'Елисеева Н.В.', role: 'Пользователь', position:'Зав. кафедрой', login: 'EliseevaNV', password: 'gbmkmjm454HG' },
                    { id: '5', name: 'Колясинская Е.З', role: 'Пользователь', position:'Зав. кафедрой', login: 'KolyasinskayaEZ', password: 'ofofgjkl66PV' },
                    { id: '6', name: 'Мешков В.Г.', role: 'Пользователь', position:'Зав. кафедрой', login: 'meshkovVG', password: 'fgfgf5thd34NG' },
                    { id: '7', name: 'Петров В.Е.', role: 'Пользователь', position:'Зав. кафедрой', login: 'PetrovVE', password: 'lpmkvk65PZX' },
                    { id: '8', name: 'Овчинников А.И', role: 'Пользователь', position:'Зав. кафедрой', login: 'OvchinnikovAI', password: 'jbicjbgf44GF' },
                    { id: '9', name: 'admin', role: 'Администратор', position:'Зав. кафедрой', login: 'admin', password: 'admin'}


                ],
                columns : ['id', 'name', 'login', 'password'],
                currentUser: {},
                editIndex: '',
                editNow: false,
                currentIndex: '',
                newUser: {
                    role: 'Пользователь',
                },
                searchQuery: '',
                filteredType: '',
                selectForNewUser: 'Пользователь'
            }
        },
        methods: {
            remove(index) {
                this.listOfUsers.splice(index, 1);
                this.currentUser = {};
                this.currentIndex = '';
            },
            edit(index) {
                this.editNow = true;
                this.editIndex = index;
                //alert(this.currentUser.name);
            },
            save() {
                this.editNow = false;
                this.editIndex = '';
            },
            deleteInit(index, user) {
                this.currentIndex = index;
                this.currentUser = user;
            },
            addUser() {
                this.newUser.id = this.listOfUsers.length + 1;
                this.listOfUsers.push(this.newUser);
                this.newUser = {};
            }
        },
        computed: {
            filteredUsers() {
                //return this.listOfUsers.filter(el => el.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
                const filteredByName = this.listOfUsers.filter(user => user.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
                if (!this.filteredType) {
                    return filteredByName;
                }
                return filteredByName.filter(user => user.role === this.filteredType);
            }
        }

    }
</script>

<style scoped>

</style>