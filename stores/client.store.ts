interface Client {
    id: string
    name: string
    nick: string
    slogan?: string
    address?: string
    phone?: string
    logo?: string
    youtube?: string
    instagram?: string
    facebook?: string
    twitter?: string
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

            // TODO validate

            try {
                this.client = await Api.put('/client', data) as Client;
            } catch (error: any) {
                throw error;
            }
        }
    }
});
