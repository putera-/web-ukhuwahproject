import { defineStore } from "pinia";
import { useApiStore } from "./api-store";

interface LoginForm {
    email: string
    password: string
}

interface RegisterForm {
    name: string
    email: string
    phone: string
    password: string
    confirm_password: string
}

interface AuthState {
    user?: User
}
export const useAuthStore = defineStore("auth", {
    state: (): AuthState => ({
        user: undefined,
    }),
    actions: {
        async login(data: LoginForm) {
            const Api = useApiStore();

            // throw jika error
            data = Validate(isLogin, data);

            // isi state user
            const response = await Api.post("/auth/login", data) as any;
            this.user = response.user;

            Api.access_token = response.access_token;
            Api.exp = response.exp;

            this.setCookie(response);

            const _redirect_path = useCookie('redirect_path');
            const redirect_path = _redirect_path.value;
            // const redirect_path = window.localStorage.getItem('redirect_path');

            if (redirect_path) {
                // window.localStorage.removeItem('redirect_path')
                _redirect_path.value = undefined;
                navigateTo(redirect_path);
            } else {
                const adminRoles = ['SUPERUSER', 'ADMIN', 'STAFF'];
                // redirect ke home admin
                if (adminRoles.includes(this.user!.role)) {
                    navigateTo("/admin");
                } else {
                    navigateTo("/");
                }
            }
        },
        async register(data: RegisterForm): Promise<void> {
            const Api = useApiStore();

            // throw jika error
            data = Validate(isRegister, data);

            // isi state user
            const response = await Api.post("/auth/register", data) as any;
            this.user = response.user;

            Api.access_token = response.access_token;
            Api.exp = response.exp;

            this.setCookie(response);

            const _redirect_path = useCookie('redirect_path');
            const redirect_path = _redirect_path.value;
            // const redirect_path = window.localStorage.getItem('redirect_path');

            if (redirect_path) {
                // window.localStorage.removeItem('redirect_path')
                _redirect_path.value = undefined;
                navigateTo(redirect_path);
            } else {
                // redirect ke home admin
                navigateTo("/");
            }
        },
        async getUser() {
            const Api = useApiStore();

            this.user = await Api.get('/auth/profile') as User;
        },
        async logout() {
            const Api = useApiStore();
            await Api.delete("/auth/logout");

            Api.reset();
            this.user = undefined;

            //redirect ke home halaman login
            navigateTo("/");
        },
        async updateUser(data: FormData) {
            const Api = useApiStore();

            // fetch user update
            this.user = await Api.patch("/auth/profile", data) as User;
        },
        async changePassword(data: Record<string, any>) {
            const Api = useApiStore();

            data = Validate(changePassword, data);

            // fetch user update
            await Api.patch("/auth/change_password", data) as User;
        },
        setCookie(data: Record<string, any>) {
            const token = useCookie('access_token')
            const exp = useCookie('exp');
            token.value = data.access_token;
            exp.value = data.exp.toString();

            // window.localStorage.setItem("access_token", data.access_token);
            // window.localStorage.setItem("exp", data.exp.toString());
        }
    },
});
