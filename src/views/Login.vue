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
    export default {
        data() {
            return {
                username: '',
                password: '',
                errorMessage: '',
            };
        },
        methods: {
             login() {
                // try {
                //     const response = await fetch('/api/login', {
                //         method: 'POST',
                //         body: JSON.stringify({ username: this.username, password: this.password }),
                //         headers: { 'Content-Type': 'application/json' },
                //     });
                //
                //     if (response.ok) {
                //         // авторизация прошла успешно
                //         const user = await response.json();
                //         this.$emit('login', user); // генерируем событие 'login' и передаем данные пользователя
                //     } else {
                //         // авторизация не удалась
                //         this.errorMessage = 'Неверное имя пользователя или пароль';
                //     }
                // } catch (error) {
                //     console.error(error);
                //     this.errorMessage = 'Произошла ошибка при авторизации';
                // }
                if(this.username === 'admin' && this.password === '1') {
                    localStorage.setItem('isLoggedIn', 'true');
                    this.$router.push('/')
                } else {
                    this.errorMessage = 'Неверный логин или пароль'
                }
            },
        },
    };
</script>
