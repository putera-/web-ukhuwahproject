export const checkToken = () => {
    const Api = useApiStore();

    if (!Api.access_token) {
        Api.access_token = window.localStorage.getItem('access_token') || undefined;
        const exp = window.localStorage.getItem('exp');

        if (exp) Api.exp = parseInt(exp)
    }
}