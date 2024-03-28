class JoiError extends Error {
    isJoi: boolean;
    data: any;
    constructor(data: any) {

        super();

        this.isJoi = true;
        this.data = data;
    }
}

export { JoiError }

// export const joiError = (error: any) => {
//     const data: Record<string, any> = {};
//     for (const e of error.details) {
//         const key = e.context.key;
//         const message = e.message;
//         data[key] = message;
//     }

//     return data;
// }