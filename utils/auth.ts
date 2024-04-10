export const checkToken = () => {
    const token = useCookie('access_token')
    const exp = useCookie('exp');
    // console.log('test')
    // console.log(test.value)

    const Api = useApiStore();

    if (!Api.access_token) {
        Api.access_token = token.value as string | undefined;
        // const exp = exp.value as string | undefined;
        // Api.access_token = window.localStorage.getItem('access_token') || undefined;
        // const exp = window.localStorage.getItem('exp');

        if (exp.value) Api.exp = parseInt(exp.value)
    }
}