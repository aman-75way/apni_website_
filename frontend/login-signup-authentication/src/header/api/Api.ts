import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a selector to get the token from your Redux state
export const selectToken = (state: RootState) => state.auth.token; // Replace with the actual path

export const postsAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
    prepareHeaders: (headers, { getState }) => {
      // Get the token from your Redux state
      const token = selectToken(getState());
      if (token) {
        // Include the authorization header if the token is available
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: ({ title, postBody, userId }) => ({
        url: 'posts',
        method: 'POST',
        body: { title, body: postBody, userId },
      }),
    }),
    
  }),
});

// Export hooks for usage in functional components
export const { useGetPostQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } = postsAPI;
