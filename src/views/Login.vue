<template>
    <div>
        <h2>Авторизация</h2>
        <form @submit.prevent="login">
            <div>
                <label for="username">Имя пользователя</label>
                <input id="username" v-model="username" type="text" required />
            </div>
            <div>
                <label for="password">Пароль</label>
                <input id="password" v-model="password" type="password" required />
            </div>
            <button type="submit">Войти</button>
            <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
        </form>
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
