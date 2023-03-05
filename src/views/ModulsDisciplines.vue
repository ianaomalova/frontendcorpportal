<template>
    <div>
        <h1>Текущий предмет: {{ this.$route.params.name }}</h1>
        <ModulsTable :group="currentGroup"/>
    </div>
    <nav aria-label="Page navigation example">
        <ul class="pagination pagination-sm justify-content-center" >
            <li v-for="group in groups" class="page-item"><a style="margin-right: 5px;" class="page-link" @click="changeGroup(group)" :class="{activeLink : currentGroup.includes(group)}">{{group}}</a></li>
        </ul>
    </nav>
</template>

<script>
    import ModulsTable from "@/components/ModulsTable";
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
            groupsInit() {
                this.groups = ['ИДБ-19-09', 'ИДБ-19-10', 'ИДБ-19-11'];
                this.currentGroup = this.groups[0];
            },
            changeGroup(group) {
                this.currentGroup = group;
            },

        },
        created() {
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