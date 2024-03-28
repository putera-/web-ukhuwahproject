export default defineNuxtRouteMiddleware(async (to, from) => {
    const Api = useApiStore();

    if (to.path == '/auth/login') {
        if (Api.token) return navigateTo('/');
    } else {
        if (!Api.token) return navigateTo('/auth/login');
    }
});
