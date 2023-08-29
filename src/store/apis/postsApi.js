import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "../../utils/headers";


/* Create POSTS API */
export const postsApi = createApi({
    reducerPath: 'posts',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL + "" + process.env.REACT_APP_WP, // WordPress REST Endpoint baseurl
        prepareHeaders: prepareHeaders
    }),
    endpoints(builder) {
        return {
            fetchPosts: builder.query({
                providesTags: (result, error, user) => {
                    const tags = result?.map(post => ({
                        type: 'Post',
                        id: result.author
                    }))
                    return tags || [];
                },
                query: () => {
                    return {
                        url: `/posts`,
                        method: 'GET',

                    }
                }
            }),
            fetchPost: builder.query({
                query: (id) => {
                    return {
                        url: `/posts/${id}`,
                        method: 'GET',

                    }
                }
            }),
            createPost: builder.mutation({
                query: (data) => {
                    return {
                        url: `/posts`,
                        method: 'POST',
                        body: data,
                    }
                },
                invalidatesTags: (result, error) => {
                    const tags = result?.map(post => ({
                        type: 'Post',
                        id: result.author.id
                    }))
                    return tags || [];
                },
            }),
            createMedia: builder.mutation({
                query: (formData) => {
                    return {
                        url: `/media`,
                        method: 'POST',
                        body: formData,
                    }
                }
            }),
            fetchMedia: builder.query({
                query: (id) => {
                    return {
                        url: `/media/${id}`,
                        method: 'GET',

                    }
                }
            }),
            fetchCategories: builder.query({
                query: () => {
                    return {
                        url: `/categories`,
                        method: 'GET',

                    }
                }
            })
        }
    }
})

export const {
    useFetchPostsQuery,
    useFetchPostQuery,
    useFetchCategoriesQuery,
    useCreateMediaMutation,
    useCreatePostMutation,
    useFetchMediaQuery
} = postsApi 