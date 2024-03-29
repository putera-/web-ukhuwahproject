

interface AsaatidzState {
    data?: Asaatidz[]
}

export const useAsaatidzStore = defineStore('asaatidz', {
    state: (): AsaatidzState => ({
        data: undefined
    }),
    actions: {
        async get(): Promise<void> {
            const Api = useApiStore();
            this.data = await Api.get('/asaatidzs') as Asaatidz[];
        },
        async create(data: FormData) {
            const Api = useApiStore();

            await Api.post('/asaatidzs', data);
        },
        async update(id: string, data: FormData) {
            const Api = useApiStore();

            await Api.patch('/asaatidzs/' + id, data);
        }
    }
});
