export default defineNuxtRouteMiddleware(async (to, from) => {
    const Auth = useAuthStore();
    const Api = useApiStore();

    checkToken();

    if (!Auth.user && Api.access_token) {
        await Auth.getUser();
        if (!Auth.user) {
            Api.reset();
        }
    }
});
