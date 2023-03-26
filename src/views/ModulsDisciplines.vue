<template>
    <div>
        <h1>Модульные журналы</h1>
<!--        <h1>Текущий предмет: {{ this.$route.params.name }}</h1>-->
        <div v-if="currentGroup !== '' ">
            <ModulsTable :group="currentGroup"/>
        </div>


    </div>
    <nav aria-label="Page navigation example">
        <ul class="pagination pagination-sm justify-content-center" >
            <li v-for="group in groups" class="page-item"><a style="margin-right: 5px;" class="page-link" @click="changeGroup(group)" :class="{activeLink : currentGroup.includes(group)}">{{group}}</a></li>
        </ul>
    </nav>
</template>

<script>
    import ModulsTable from "@/components/ModulsTable";
    import {getGroups} from "@/api/ModulsTable";

    export default {
        components: {
            ModulsTable
        },
        data() {
            return {
                groups: [],
                currentGroup: '',
                listOfStudent: [],
                arrayHeaders: [],
            }
        },
        methods: {
            async groupsInit() {
                //this.groups = ['ИДБ-19-09', 'ИДБ-19-10', 'ИДБ-19-11'];
                const response = await getGroups();
                const data = response.data
                this.groups = data;
                // setTimeout(() => {
                //     this.currentGroup = this.groups[0];
                // }, 2000)
                this.currentGroup = this.groups[0];
                console.log(this.currentGroup);
            },
            changeGroup(group) {
                this.currentGroup = group;
                console.log(this.currentGroup);
            },

        },
        mounted() {
            //Получаем с сервера группы привязанные к текущему предмету
            this.groupsInit();

        },
        watch: {

        }
    }
</script>

<style scoped>
    .activeLink {
        background-color: rgba(127, 215, 251, 0.4);
    }
    .activeLink:hover {
        background-color: rgba(127, 215, 251, 0.4)
    }
    a {
        cursor: default;
    }
    a:hover {
        color: blue;
    }
    a:active {
        color: blue;
    }
</style>