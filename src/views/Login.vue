<template>
<!--    <div>-->
<!--        <h2>Авторизация</h2>-->
<!--        <form @submit.prevent="login">-->
<!--            <div>-->
<!--                <label for="username">Имя пользователя</label>-->
<!--                <input id="username" v-model="username" type="text" required />-->
<!--            </div>-->
<!--            <div>-->
<!--                <label for="password">Пароль</label>-->
<!--                <input id="password" v-model="password" type="password" required />-->
<!--            </div>-->
<!--            <button type="submit">Войти</button>-->
<!--            <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>-->
<!--        </form>-->
<!--    </div>-->
    <div class="photo">
        <div class="container">
            <div class="frame">
                <div style="margin-top: 100px">
                    <h1 style="color: rgb(255,255,255)">Авторизация</h1>
                    <form class="form-signin" name="form">
                        <label  for="username">Логин</label>
                        <input v-model="username" id="username" class="form-styling" type="text" name="username" placeholder=""/>
                        <label for="password">Пароль</label>
                        <input v-model="password" id="password" class="form-styling" type="password" name="password" placeholder=""/>
                        <div class="btn-animate">
                            <a @click="login" class="btn-signin" style="color: rgba(255,255,255,.9); background-color: #1059FF">Войти</a>
                        </div>
                        <div v-if="errorMessage" style="color: red; margin-top: 90px">{{ errorMessage }}</div>
                    </form>

                </div>

            </div>
        </div>
    </div>

</template>

<script>
    import axios from "axios";
    import { mapGetters, mapActions } from "vuex";
    export default {
        data() {
            return {
                username: "",
                password: "",
                errorMessage: "",
            };
        },
        computed: {
            ...mapGetters(["isLoggedIn"]),
        },
        methods: {
            async login() {
                try {
                    await this.$store.dispatch("axiosLogIn", {
                        login: this.username,
                        password: this.password,
                    });
                    if (this.isLoggedIn) {
                        localStorage.setItem("isLoggedIn", "true");
                        this.$router.push("/");
                        this.username = "";
                        this.password = "";
                        this.errorMessage = "";
                    } else {
                        this.errorMessage = "Неверный логин или пароль";
                    }
                } catch (e) {
                    console.error(e);
                }
            },
        },
    };
</script>
<style scoped>
    .container {
        width: 100%;
        padding-top: 60px;
        padding-bottom: 100px;
    }

    .frame {
        height: 575px;
        width: 430px;
        background:
                -webkit-linear-gradient(
                        rgba(68, 158, 227, 0.65),
                        rgba(42, 51, 102, 0.95)),
                url(https://images.unsplash.com/photo-1515266591878-f93e32bc5937?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80) no-repeat center center;

        background-size: cover;
        margin-left: auto;
        margin-right: auto;
        border-top: solid 1px rgba(255,255,255,.5);
        border-radius: 10px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.2);
        overflow: hidden;
        -webkit-transition: all .5s ease;
        transition: all .5s ease;
    }


    li {
        padding-left: 10px;
        font-size: 18px;
        display: inline;
        text-align: left;
        text-transform: uppercase;
        padding-right: 10px;
        color: #ffffff;
    }

    .signin-active a {
        padding-bottom: 10px;
        color: #ffffff;
        text-decoration: none;
        border-bottom: solid 2px #1059FF;
        -webkit-transition: all .25s ease;
        transition: all .25s ease;
        cursor: pointer;
    }

    .signin-inactive a {
        padding-bottom: 0;
        color: rgba(255,255,255,.3);
        text-decoration: none;
        border-bottom: none;
        cursor: pointer;
    }

    .signup-active a {
        cursor: pointer;
        color: #ffffff;
        text-decoration: none;
        border-bottom: solid 2px #1059FF;
        padding-bottom: 10px;
    }

    .signup-inactive a {
        cursor: pointer;
        color: rgba(255,255,255,.3);
        text-decoration: none;
        -webkit-transition: all .25s ease;
        transition: all .25s ease;
    }

    .form-signin {
        width: 430px;
        height: 375px;
        font-size: 16px;
        font-weight: 300;
        padding-left: 37px;
        padding-right: 37px;
        padding-top: 55px;
        -webkit-transition: opacity .5s ease, -webkit-transform .5s ease;
        transition: opacity .5s ease, -webkit-transform .5s ease;
        transition: opacity .5s ease, transform .5s ease;
        transition: opacity .5s ease, transform .5s ease, -webkit-transform .5s ease;
    }



    .form-signin input{
        color: #ffffff;
        font-size: 13px;
    }

    .form-styling {
        width: 100%;
        height: 35px;
        padding-left: 15px;
        border: none;
        border-radius: 20px;
        margin-bottom: 20px;
        background: rgba(255,255,255,.6);
    }

    label {
        font-weight: 400;
        text-transform: uppercase;
        font-size: 13px;
        padding-left: 15px;
        padding-bottom: 10px;
        color: rgba(255,255,255,.7);
        display: block;
    }

    :focus {outline: none;
    }

    .form-signin input:focus, textarea:focus, .form-signup input:focus, textarea:focus {
        background: rgba(255,255,255,.3);
        border: none;
        padding-right: 40px;
        -webkit-transition: background .5s ease;
        transition: background .5s ease;
    }



    .btn-signin {
        float: left;
        padding-top: 8px;
        width: 100%;
        height: 35px;
        border: none;
        border-radius: 20px;
        margin-top: -8px;
    }

    .btn-animate {
        float: left;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 13px;
        text-align: center;
        color: rgba(255,255,255, 1);
        padding-top: 8px;
        width: 100%;
        height: 35px;
        border: none;
        border-radius: 20px;
        margin-top: 23px;
        background-color: rgba(16,89,255, 1);
        left: 0px;
        top: 0px;
        -webkit-transition: all .5s ease, top .5s ease .5s, height .5s ease .5s, background-color .5s ease .75s;
        transition: all .5s ease, top .5s ease .5s, height .5s ease .5s, background-color .5s ease .75s;
    }

    a.btn-signup:hover, a.btn-signin:hover {
        cursor: pointer;
        background-color: #0F4FE6;
        -webkit-transition: background-color .5s;
        transition: background-color .5s;
    }



    .forgot a {
        color: rgba(255,255,255,.3);
        font-weight: 400;
        font-size: 13px;
        text-decoration: none;
    }


    h1 {
        color: #ffffff;
        font-size: 35px;
        font-weight: 300;
        text-align: center;
    }

    .photo {
        background-color: white;
    }
</style>
