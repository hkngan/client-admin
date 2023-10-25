import { apiSlice } from "../../api/apiSlice";
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credential => ({
                url: '/admin-login',
                method: "POST",
                body: {...credential}
            })
        })
    })
})

export const {
    useLoginMutation
} = authApiSlice