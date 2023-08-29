import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { prepareHeaders } from '../../utils/headers';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL, // WordPress REST Endpoint baseurl
        prepareHeaders: prepareHeaders
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => {
                return {
                    url: 'register',
                    method: 'POST',
                    body: data,
                };
            }
        }),
        login: builder.mutation({
            query: (data) => {
                return {
                    url: 'login',
                    method: 'POST',
                    params: {
                        rest_route: "/jwt/v1/auth",
                        username: data?.user,
                        password: data?.pwd
                    }
                };
            },
        }),
        fetchCurrentUser: builder.query({
            providesTags: ['CurrentUser'],
            async queryFn(data, _queryApi, _extraOptions, fetchWithBQ) {
                return await fetchWithBQ({
                    url: process.env.REACT_APP_WP + '/users/me',
                    method: 'GET'
                })
            }
        }),
        logoutUser: builder.mutation({
            queryFn: (id) => ({ data: null }),
            invalidatesTags: ['CurrentUser']
        })
    }),
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useFetchCurrentUserQuery,
    useLogoutUserMutation
} = authApi;