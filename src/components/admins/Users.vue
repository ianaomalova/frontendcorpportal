<template>
    <h1>Панель администратора</h1>
    <div>
        <table class="table table-bordered border-primary" style="max-width: 60%">
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
                <tr v-for="(user, index) in listOfUsers" :key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{user.name}}</td>
                    <td v-if="editIndex === index && editNow === true"><input class="form-control" type="text" v-model="user.login"></td>
                    <td v-else>{{user.login}}</td>
                    <td v-if="editIndex === index && editNow === true"><input class="form-control" type="text" v-model="user.password"></td>
                    <td v-else>{{user.password}}</td>
                    <td><button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="currentIndex = index"><img src="icons/delete_FILL0_wght400_GRAD0_opsz24.png" alt=""></button></td>
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
                    Вы действительно хотите удалить пользователя?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="remove(currentIndex)">Удалить</button>
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

            }
        },
        methods: {
            remove(index) {
                this.listOfUsers.splice(index, 1);
            },
            edit(index) {
                this.editNow = true;
                this.editIndex = index;
                //alert(this.currentUser.name);
            },
            save() {
                this.editNow = false;
                this.editIndex = '';
            }
        }

    }
</script>

<style scoped>

</style>