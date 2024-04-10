export default defineNuxtRouteMiddleware(async (to, from) => {
    const Auth = useAuthStore();
    const Api = useApiStore();

    checkToken();

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
        if (!Api.access_token) {
            return navigateTo('/auth/login');
        } else {
            if (!Auth.user) {
                await Auth.getUser();
                if (!Auth.user) {
                    Api.reset();
                }
            }
        }
    }

    if (Auth.user) {
        const adminRoles = ['SUPERUSER', 'ADMIN', 'STAFF'];
        // redirect ke home admin
        if (!adminRoles.includes(Auth.user.role)) {
            return navigateTo("/");
        }
    }
});
