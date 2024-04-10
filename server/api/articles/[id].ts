export default defineEventHandler(async (e): Promise<Article> => {
    const id = e.context.params!.id;
    try {
        const article = await $fetch(apiUri + '/articles/published/' + id) as Article;
        return article;
    } catch (error: any) {
        return error;
    }
})