"use client";
import React from "react";
import { useGetProductsQuery } from "@/app/GlobalRedux/features/api/apiSlice";
import Link from "next/link";
import FeaturesDemo from "./FeaturesDemo";
import Loader from "../Loader/Loader";

const FeaturedSection = () => {
  const { data, isLoading } = useGetProductsQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (!data || !Array.isArray(data.products)) {
    return <div>No products available</div>;
  }

  const limitedData = data.products.slice(0, 8);
  console.log(limitedData);

  return (
    <div>
      <div className="md:px-14 px-4 py-16 max-w-screen-2xl mx-auto">
        <div className="text-center my-8">
          <h2 className="text-3xl mb-2">Featured Products</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 space-x-1">
          {limitedData.map((product: any) => (
            <FeaturesDemo product={product} key={product._id} />
          ))}
        </div>
        <div className="text-center p-2">
          <Link
            href="/product"
            className="bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold py-2 px-4 rounded mt-4 inline-block "
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
