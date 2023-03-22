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
    import axios from 'axios'
    export default {
        data() {
            return {
                username: '',
                password: '',
                errorMessage: '',
            };
        },
        methods: {
             async login() {
                try {
                    const response = await axios.get("https://localhost:5001/authorization", {
                        params: {
                            login: this.username,
                            password: this.password
                        }
                    })
                    const data = response.data;
                    if(data) {
                        localStorage.setItem('isLoggedIn', 'true');
                        this.$router.push('/')
                    }
                    else {
                        this.errorMessage = 'Неверный логин или пароль'
                    }
                } catch (e) {
                    console.error(e)
                }
                // if(this.username === 'admin' && this.password === '1') {
                //     localStorage.setItem('isLoggedIn', 'true');
                //     this.$router.push('/')
                // } else {
                //     this.errorMessage = 'Неверный логин или пароль'
                // }
            },
        },
    };
</script>
