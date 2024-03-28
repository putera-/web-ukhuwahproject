interface ProfileState {
    profile: Profile | null
}

export const useProfileStore = defineStore('profile', {
    state: (): ProfileState => ({
        profile: null
    }),
    actions: {
        async get(): Promise<void> {
            const Api = useApiStore();
            this.profile = await Api.get('/profile') as Profile;
        },
        async update(data: Record<string, string> | FormData): Promise<void> {
            const Api = useApiStore();
            try {
                this.profile = await Api.put('/profile', data) as Profile;
            } catch (error: any) {
                throw error;
            }
        }
    }
});
