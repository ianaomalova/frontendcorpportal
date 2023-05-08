<template>
    <h1>Панель администратора</h1>
    <div class="input-group" style="max-width: 300px; margin-bottom: 25px; margin-left: 15px">
        <div class="input-group-prepend">
            <span class="input-group-text"><img src="icons/search_FILL0_wght400_GRAD0_opsz24.png" alt=""></span>
        </div>
        <input type="text" class="form-control" placeholder="Search..." v-model="searchQuery">

    </div>
    <div>
        <table class="table table-bordered border-primary" style="max-width: 60%; margin-left: 30px">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>ФИО</th>
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
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Удалить пользователя</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Вы действительно хотите удалить пользователя {{currentUser.name}}?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="remove(currentIndex)">Удалить</button>
                </div>
            </div>
        </div>
    </div>

    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">
        Добавить пользователя
    </button>
    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel2">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" placeholder="ФИО: " v-model="newUser.name">
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" placeholder="Логин: " v-model="newUser.login">
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" placeholder="Пароль: " v-model="newUser.password">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
                    { id: '1', name: 'Чеканин В.А.', login: 'ChekaninVA', password: 'qfsghy12HHG' },
                    { id: '2', name: 'Ибатулин М.Ю.', login: 'IbatulinMU', password: 'gfgf76OP' },
                    { id: '3', name: 'Бычкова Н.А.', login: 'BichkovaNA', password: 'fgfhgfrvdf56hgf' },
                    { id: '4', name: 'Елисеева Н.В.', login: 'EliseevaNV', password: 'gbmkmjm454HG' },
                    { id: '5', name: 'Колясинская Е.З', login: 'KolyasinskayaEZ', password: 'ofofgjkl66PV' },
                    { id: '6', name: 'Мешков В.Г.', login: 'meshkovVG', password: 'fgfgf5thd34NG' },
                    { id: '7', name: 'Петров В.Е.', login: 'PetrovVE', password: 'lpmkvk65PZX' },
                    { id: '8', name: 'Овчинников А.И', login: 'OvchinnikovAI', password: 'jbicjbgf44GF' },


                ],
                columns : ['id', 'name', 'login', 'password'],
                currentUser: {},
                editIndex: '',
                editNow: false,
                currentIndex: '',
                newUser: {},
                searchQuery: '',
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
                return this.listOfUsers.filter(el => el.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }
        }

    }
</script>

<style scoped>

</style>