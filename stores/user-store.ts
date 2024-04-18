interface UserState {
    users: User[]
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        users: []
    }),
    actions: {
        async get(): Promise<void> {
            const Api = useApiStore();
            this.users = await Api.get('/users') as User[]
        },
        async activate(id: string): Promise<void> {
            const Api = useApiStore();
            await Api.patch('/users/activate/' + id, {})
        },
        async deactivate(id: string): Promise<void> {
            const Api = useApiStore();
            await Api.patch('/users/deactivate/' + id, {})
        },
        async setRole(id: string, role: string): Promise<void> {
            const Api = useApiStore();
            await Api.patch('/users/set-role/' + id, { role });
        }
    }
})