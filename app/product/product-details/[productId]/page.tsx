"use client";
import { useSingleProductQuery } from "@/app/GlobalRedux/features/api/apiSlice";
import { addToCart } from "@/app/GlobalRedux/features/cart/cartSlice";
import { useAppDispatch } from "@/app/GlobalRedux/hooks";
import Loader from "@/components/Loader/Loader";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  name: string;
  slug: string;
  photos: string[];
  description: string | string[];
  metaKey: string;
  price: number;
  discount: number;
  stockStatus: boolean;
  status: boolean;
  sellerName: string;
}

const PageDetails = () => {
  const { productId } = useParams(); // Get productId from the URL params

  const {
    data: product,
    isLoading,
    error,
  } = useSingleProductQuery(productId as string); // Fetch product data

  const dispatch = useAppDispatch();

  const handleAddProduct = () => {
    if (product) {
      const cartProduct = {
        _id: product.product._id,
        name: product.product.name,
        price: product.product.price,
        quantity: 1,
        photos: product.product.photos,
      };
      dispatch(addToCart(cartProduct));
      toast.success("Product Added!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p>Error: {(error as Error).message}</p>;
  }

  return (
    <div className="p-4 mx-auto mt-7 max-w-7xl md:p-8">
      {product ? (
        <div className="flex flex-col items-center border-b border-gray-300 md:flex-row md:space-x-8">
          <div className="w-full md:w-1/2">
            <Image
              src={product.product.photos[0]} // Using the first image from photos array
              alt={product.product.name}
              className="w-full h-auto rounded-lg md:h-full md:w-full"
              width={500} // Adjust as necessary
              height={500} // Adjust as necessary
            />
          </div>
          <div className="w-full mt-4 space-y-3 md:w-1/2 md:mt-0">
            <h1 className="text-3xl font-semibold">{product.product.name}</h1>
            <h1 className=" font-semibold">{product.product.metaKey}</h1>
            <p className="text-xl">Price: ${product.product.price}</p>
            <ul className="space-y-1 text-lg">
              <li>{product.product.description}</li>
            </ul>
            <button
              onClick={handleAddProduct}
              className="px-6 py-2 mt-4 uppercase transition duration-200 ease-in border-2 border-purple-900 md:mt-6 rounded-2xl hover:bg-purple-800 hover:text-white focus:outline-none"
            >
              Add to cart
            </button>
          </div>
        </div>
      ) : (
        <p>No product data available</p>
      )}
    </div>
  );
};

export default PageDetails;
