interface DonationState {
    data?: Pagination<Donation[]>
    donations: Donation[]
}

export const useDonationStore = defineStore('donation', {
    state: (): DonationState => ({
        data: undefined,
        donations: []
    }),
    getters: {
        total: (state) => state.data ? state.data.total : 0,
        page: (state) => state.data ? state.data.page : 0,
        limit: (state) => state.data ? state.data.limit : 0,
        maxPage: (state) => state.data ? state.data.maxPage : 0
    },
    actions: {
        async get(campaignId: string, page: number = 1) {
            const Api = useApiStore();

            this.data = await Api.get(`/campaigns/donations/${campaignId}?page=${page}`) as Pagination<Donation[]>

            if (page == 1) {
                this.donations = this.data.data;
            } else {
                this.donations = [...this.donations, ...this.data.data];
            }
        },
    }
})