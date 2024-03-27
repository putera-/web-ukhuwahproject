import { defineStore } from "pinia";

export const useApiStore = defineStore("api", {
  state: () => ({
    access_token: undefined,
    exp: undefined,
  }),
  getters: {
    headers: (state) => {
      const headers = {};
      if (!state.access_token) {
        return headers;
      } else {
        headers["Authorization"] = `Bearer ${state.access_token}`;
        return headers;
      }
    },
  },
  actions: {
    // GET
    async get(path) {
      const config = useRuntimeConfig();
      const apiUri = config.public.apiUri;

      try {
        const data = await $fetch(apiUri + path, {
          method: "GET",
          headers: this.headers,
        });

        // RETURN DATA
        return data;
      } catch (error) {
        this.handleError(error);
      }
    },
    // POST
    async post(path, data) {
      // get api Uri
      const config = useRuntimeConfig();
      const apiUri = config.public.apiUri;

      if (!(data instanceof FormData)) {
        data = JSON.stringify(data);
      }

      try {
        const response = await $fetch(apiUri + path, {
          method: "POST",
          body: data,
          headers: this.headers,
        });

        // RETURN DATA
        return response;
      } catch (error) {
        this.handleError(error);
      }
    },
    // PUT
    async put(path, data) {
      // get api Uri
      const config = useRuntimeConfig();
      const apiUri = config.public.apiUri;

      if (!(data instanceof FormData)) {
        // jika data bukan formData, ubah ke json
        data = JSON.stringify(data);
      }

      try {
        const response = await $fetch(apiUri + path, {
          method: "PUT",
          body: data,
          headers: this.headers,
        });

        // RETURN DATA
        return response;
      } catch (error) {
        this.handleError(error);
      }
    },
    // PATCH
    async patch(path, data) {
      const config = useRuntimeConfig();
      const apiUri = config.public.apiUri;

      if (!(data instanceof FormData)) {
        data = JSON.stringify(data);
      }

      try {
        const response = await $fetch(apiUri + path, {
          method: "PATCH",
          body: data,
          headers: this.headers,
        });

        // RETURN DATA
        return response;
      } catch (error) {
        this.handleError(error);
      }
    },
    // DELETE
    async delete(path) {
      const config = useRuntimeConfig();
      const apiUri = config.public.apiUri;

      try {
        const data = await $fetch(apiUri + path, {
          method: "DELETE",
          headers: this.headers,
        });

        // RETURN DATA
        return data;
      } catch (error) {
        this.handleError(error);
      }
    },
    handleError(error) {
      console.log(error);
      const route = useRoute();
      // 401 UNAUTHORIZED
      if (error.status == 401) {
        if (route.path == '/auth/login') {
          throw new Error(error.data.message || error.message);
        } else {
          this.reset();
          navigateTo('/auth/login')
        }
      }

      // selain 401 & 400
      throw createError({
        statusCode: error.status || 500,
        statusMessage:
          error.data.message || error.message || "Internal Server Error!",
      });
    },
    reset() {
      this.access_token = undefined;
      this.exp = undefined;

      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("exp");
    },
  },
});
