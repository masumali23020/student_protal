import apiSlice from "../api/apiSlice";

// RTK actions.
import { userLoggedIn } from "./authSlice";

const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({ url: "/register", method: "POST", body: data }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: authData } = await queryFulfilled;

          localStorage.setItem("auth", JSON.stringify(authData));
          dispatch(userLoggedIn(authData));
        } catch (error) {}
      },
    }),

    login: builder.mutation({
      query: (data) => ({
         url: "/login",
         
       method: "POST", 
       body: data }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: authData } = await queryFulfilled;

          localStorage.setItem("auth", JSON.stringify(authData));
          dispatch(userLoggedIn(authData));
        } catch (error) {}
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authAPI;
export default authAPI;
