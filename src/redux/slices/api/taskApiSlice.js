import { apiSlice } from "../apiSlice";

const TASKs_URL = "/task";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: (data) => ({
        url: `${TASKs_URL}/dashboard`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllTask: builder.query({
      query: ({ strQuery, isTrashed, search }) => {
        // Create an array of query parameters if they have values
        const queryParams = [];
        if (strQuery) queryParams.push(`stage=${strQuery}`);
        if (isTrashed) queryParams.push(`isTrashed=${isTrashed}`);
        if (search) queryParams.push(`search=${search}`);

        // Join the query parameters with "&" to create the query string
        const queryString = queryParams.length
          ? `?${queryParams.join("&")}`
          : "";

        return {
          url: `${TASKs_URL}${queryString}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),

    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASKs_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    duplicateTask: builder.mutation({
      query: (id) => ({
        url: `${TASKs_URL}/duplicate/${id}`,
        method: "POST",
        body: {},
        credentials: "include",
      }),
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `${TASKs_URL}/update/${data._id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});
export const {
  useGetDashboardStatsQuery,
  useGetAllTaskQuery,
  useCreateTaskMutation,
  useDuplicateTaskMutation,
  useUpdateTaskMutation,
} = postApiSlice;
