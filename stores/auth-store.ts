import { defineStore } from "pinia";
import { useApiStore } from "./api-store";

interface LoginForm {
    email: string
    password: string
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
            try {
                const Api = useApiStore();

                // throw jika error
                data = Validate(isLogin, data);

                // isi state user
                const response = await Api.post("/auth/login", data) as any;
                this.user = response.user;

                Api.access_token = response.access_token;
                Api.exp = response.exp;

                window.localStorage.setItem("access_token", response.access_token);
                window.localStorage.setItem("exp", response.exp.toString());

                // redirect ke home admin
                navigateTo("/");
            } catch (error) {
                throw error;
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
        // async updateUser(data) {
        //     const Api = useApiStore();

        //     data = Validate(updateUserValidation, data);

        //     // fetch user update
        //     this.user = await Api.patch("/auth/change_password", data);
        // },
    },
});
