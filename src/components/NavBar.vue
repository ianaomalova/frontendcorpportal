<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-light curs bi" style="background-image: url('images/background.jpg')">
        <div class="container-fluid">
            <a class="navbar-brand" @click="this.$router.push('/')"><img :src="path" alt="" width="55" height="35" class="d-inline-block align-text-top"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown dropdown-hover">
                        <a :class="{active: this.$route.path === '/news' || this.$route.path === '/ads'}"
                           class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            О кафедре
                        </a>
                        <ul class="dropdown-menu" >
                            <li><a class="dropdown-item" @click="$event=>this.$router.push('/news')">Новости</a></li>
                            <li><a class="dropdown-item" @click="$event=>this.$router.push('/ads')">Объявления</a></li>
                        </ul>
                    </li>
                    <li v-if="access" class="nav-item ">
                        <a class="nav-link"
                           aria-current="page"
                           :class="{active: this.$route.path === '/calendar'}"
                           @click="this.$router.push('/calendar')"
                        >Календарь</a>
                    </li>
                    <!--                    <li class="nav-item">-->
                    <!--                        <a-->
                    <!--                                class="nav-link"-->
                    <!--                                aria-current="page"-->
                    <!--                                :class="{active: this.$route.path === '/modals'}"-->
                    <!--                                @click="this.$router.push('/modals')">Модульные журналы</a>-->
                    <!--                    </li>-->
                    <li class="nav-item dropdown dropdown-hover">
                        <a v-if="access" :class="{active: this.$route.path.startsWith('/moduls/')}" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Модульные журналы
                        </a>
                        <ul class="dropdown-menu" >
                            <li v-for="item in disciplines"><a class="dropdown-item"  @click="$event=>this.$router.push(`/moduls/${item}`)">{{item}}</a></li>
<!--                            <li><hr class="dropdown-divider"></li>-->
<!--                            <li><a class="dropdown-item" href="#">Доп раздел</a></li>-->
                        </ul>
                    </li>
                    <!--                    <li class="nav-item">-->
                    <!--                        <a class="nav-link disabled">Disabled</a>-->
                    <!--                    </li>-->
                </ul>
<!--                <div style="margin-right: 15px">-->
<!--                    <p style="margin: auto">{{User}}</p>-->
<!--                </div>-->
                <button v-if="access" type="button" class="float-right btn btn-primary" @click="logoutQ">Выйти</button>
                <button v-if="access === false" type="button" class="float-right btn btn-primary" @click="logIn">Войти</button>
                <!--                <form class="d-flex" role="search">-->
                <!--                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">-->
                <!--                    <button class="btn btn-outline-success" type="submit">Search</button>-->
                <!--                </form>-->
            </div>
        </div>
    </nav>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import router from '@/router/router'
    export default {

        props: {
            disciplines : {
                type: Array
            },
            access: {
                type: Boolean,
                required: true
            }
        },
        computed: {
            ...mapGetters(["isLoggedIn"])
        },
        methods: {
            // ...mapActions(["logout"]),
            logoutQ() {
                this.$store.dispatch('logout', this.$router);

            },
            logIn() {
                this.$router.push('/login')
            }

        },
        watch: {
          // access() {
          //
          // }
        },
        data() {
            return {
                path: '/images/UITS.png',
            }
        },

    }
</script>

<style scoped>
    .dropdown-hover:hover .dropdown-menu {
        display: block;
    }
</style>