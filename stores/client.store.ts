interface Client {
    id: string
    name: string
    nick: string
    slogan?: string
    address?: string
    phone?: string
    logo?: string
    logo_sm?: string
    youtube?: string
    instagram?: string
    facebook?: string
    twitter?: string
    bank_name?: string
    bank_holder_name?: string
    bank_account_no?: string
    createdAt: Date
    updatedAt: Date
}

interface ClientState {
    client: Client | null
}

export const useClientStore = defineStore('client', {
    state: (): ClientState => ({
        client: null
    }),
    actions: {
        async get(): Promise<void> {
            const Api = useApiStore();
            this.client = await Api.get('/client') as Client;
        },
        async update(data: Record<string, string> | FormData): Promise<void> {
            const Api = useApiStore();

            try {
                this.client = await Api.patch('/client', data) as Client;
            } catch (error: any) {
                throw error;
            }
        }
    }
});
