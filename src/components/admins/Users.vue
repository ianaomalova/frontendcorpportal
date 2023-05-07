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
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in listOfUsers" :key="user.id">
                    <td v-for="key in columns">
                        {{user[key]}}
                    </td>
                    <td><button type="button" class="btn" @click="remove(index)"><img src="icons/delete_FILL0_wght400_GRAD0_opsz24.png" alt=""></button></td>
                </tr>
            </tbody>
        </table>
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

            }
        },
        methods: {
            remove(index) {
                this.listOfUsers.splice(index, 1);
            }
        }

    }
</script>

<style scoped>

</style>