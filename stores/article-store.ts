interface ArticleState {
    data?: Pagination<Article>
}
export const useArticleStore = defineStore('article', {
    state: (): ArticleState => ({
        data: undefined
    }),
    getters: {
        articles: (state) => state.data ? state.data.data : [],
        total: (state) => state.data ? state.data.total : 0,
        page: (state) => state.data ? state.data.page : 0,
        limit: (state) => state.data ? state.data.limit : 0,
        maxPage: (state) => state.data ? state.data.maxPage : 0
    },
    actions: {
        async getPublisheds(search = '') {
            const Api = useApiStore();

            this.data = await Api.get(`/articles/published?search=${search}`) as Pagination<Article>
        }
    }
})