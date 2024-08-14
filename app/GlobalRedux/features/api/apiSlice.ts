import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://medicine-e-commerce-server.vercel.app/",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "api/v3/products",
    }),
    singleProduct: builder.query({
      query: (id) => `api/v3/products/${id}`,
    }),
    getCategories: builder.query({
      query: () => "api/v2/categories/",
    }),
    singleCategory: builder.query({
      query: (id) => `api/v2/categories/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSingleProductQuery,
  useGetCategoriesQuery,
  useSingleCategoryQuery,
} = api;
