import { defineStore } from 'pinia';

interface ApiState {
    access_token?: string
    exp?: number
}
export const useApiStore = defineStore('api', {
    state: (): ApiState => ({
        access_token: undefined,
        exp: undefined,
    }),
    getters: {
        headers: (state) => {
            const headers: Record<string, any> = {}
            if (!state.access_token) {
                return headers
            } else {
                headers['Authorization'] = `Bearer ${state.access_token}`;
                return headers;
            }
        }
    },
    actions: {
        // GET
        async get(path: string) {
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            try {
                const data = await $fetch(apiUri + path, {
                    method: 'GET',
                    headers: this.headers,
                });

                // RETURN DATA
                return data
            } catch (error) {
                this.handleError(error);
            }
        },
        // POST
        async post(path: string, data: Record<string, any> | FormData) {
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            const body = !(data instanceof FormData)
                ? JSON.stringify(data)
                : data

            try {
                const response = await $fetch(apiUri + path, {
                    method: 'POST',
                    body,
                    headers: this.headers,
                });

                // RETURN DATA
                return response
            } catch (error) {
                this.handleError(error);
            }
        },
        // PUT
        async put(path: string, data: Record<string, any> | FormData) {
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            const body = !(data instanceof FormData)
                ? JSON.stringify(data)
                : data

            try {
                const response = await $fetch(apiUri + path, {
                    method: 'PUT',
                    body,
                    headers: this.headers,
                });

                // RETURN DATA
                return response
            } catch (error) {
                this.handleError(error);
            }
        },
        // PATCH
        async patch(path: string, data: Record<string, any> | FormData) {
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            const body = !(data instanceof FormData)
                ? JSON.stringify(data)
                : data

            try {
                const response = await $fetch(apiUri + path, {
                    method: 'PATCH',
                    body,
                    headers: this.headers,
                });

                // RETURN DATA
                return response
            } catch (error) {
                this.handleError(error);
            }
        },
        // DELETE
        async delete(path: string) {
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            try {
                const data = await $fetch(apiUri + path, {
                    method: 'DELETE',
                    headers: this.headers,
                });

                // RETURN DATA
                return data
            } catch (error) {
                this.handleError(error);
            }
        },
        // POST
        // async download(path: string, data: Record<string, any>, filename: string) {
        //     const config = useRuntimeConfig();
        //     const apiUri = config.public.apiUri;

        //     try {
        //         const response = await $fetch(apiUri + path, {
        //             method: 'POST',
        //             body: data,
        //         }) as any;

        //         // Create a URL for the file blob
        //         const url = window.URL.createObjectURL(response);

        //         // Create a link element to trigger the download
        //         const link = document.createElement('a');
        //         link.href = url;
        //         link.setAttribute('download', filename); // Set the filename

        //         // Append the link to the body and trigger the download
        //         document.body.appendChild(link);
        //         link.click();

        //         // Clean up: remove the link and revoke the URL
        //         document.body.removeChild(link);
        //         window.URL.revokeObjectURL(url);

        //         // RETURN DATA
        //         return;
        //     } catch (error) {
        //         this.handleError(error);
        //     }
        // },
        handleError(error: any) {
            // RAPIHKAN
            // 401 UNAUTHORIZED / BELUM LOGIN
            if (error.status == 401) {
                this.reset();
                // hapus token dari cookie
                // const token = useCookie('token');
                // token.value = '';

                // lempar ke halaman home
                return navigateTo('/');
            }

            // 400 BAD REQUEST
            if (error.status == 400) {
                throw createError({
                    statusCode: 400, // <- default code 500
                    statusMessage: error.data.message || error.data.error // <- default message
                });
            }

            // SELAIN 401 & 400
            throw createError({
                statusCode: error.status || 500, // <- default code 500
                statusMessage: error.data.message || 'Internal Server Error!' // <- default message
            });
        },
        reset() {
            this.access_token = undefined;
            this.exp = undefined;

            window.localStorage.removeItem("access_token");
            window.localStorage.removeItem("exp");
        }
    }
});
