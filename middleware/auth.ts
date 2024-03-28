export default defineNuxtRouteMiddleware(async (to, from) => {
    const Auth = useAuthStore();
    const Api = useApiStore();

    if (!Api.access_token) {
        Api.access_token = window.localStorage.getItem('access_token') || undefined;
        const exp = window.localStorage.getItem('exp');

        if (exp) Api.exp = parseInt(exp)
    }

    if (to.path == '/auth/login' || to.path == '/auth/register') {
        if (!Auth.user && Api.access_token) {
            await Auth.getUser();
            if (Auth.user) {
                return navigateTo('/');
            } else {
                Api.reset();
            }
        }
    } else {
        if (!Api.access_token) return navigateTo('/auth/login');
    }
});
