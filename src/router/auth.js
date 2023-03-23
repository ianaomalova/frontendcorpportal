import router from "@/router/router";

export const auth = {
    isAuthenticated() {
        // Проверяем наличие токена в localStorage
        const token = localStorage.getItem('isLoggedIn');
        return token !== null;
    },

}