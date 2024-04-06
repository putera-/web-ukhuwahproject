import type { RouteLocationNormalizedLoaded } from "vue-router";

export const isToLoginPage = async (route: RouteLocationNormalizedLoaded) => {
    const Api = useApiStore();
    const Auth = useAuthStore();

    checkToken();

    if (!Api.access_token) {
        toLoginPage(route);
        return;
    }

    if (!Auth.user) {
        await Auth.getUser();
        if (!Auth.user) {
            toLoginPage(route);
            return;
        }
    }
}

const toLoginPage = (route: RouteLocationNormalizedLoaded) => {
    window.localStorage.setItem('redirect_path', route.path)
    navigateTo('/auth/login');
}