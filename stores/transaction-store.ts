export const useTransaction = defineStore('transaction', {
    state: () => ({

    }),
    actions: {
        async createCampaignTransaction(gross_amount: number, campaignId: string, callbacks: string): Promise<Transaction> {
            const Api = useApiStore();

            const response = await Api.post('/payments/campaign/transaction', { gross_amount, campaignId, callbacks }) as Transaction;
            return response;
        }
    }
})