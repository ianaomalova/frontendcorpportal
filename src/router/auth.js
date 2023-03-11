import router from "@/router/router";

export const auth = {
    isAuthenticated() {
        // Проверяем наличие токена в localStorage
        const token = localStorage.getItem('isLoggedIn');
        return token !== null;
    },
    logout() {
        localStorage.removeItem('isLoggedIn');
        // Выполняем перенаправление на страницу авторизации
        router.push('/login');
    }
    // ... Другие методы для работы с авторизацией, такие как login(), logout() и т.д.
}