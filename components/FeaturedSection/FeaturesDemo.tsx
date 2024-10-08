"use client";
import { addToCart } from "@/app/GlobalRedux/features/cart/cartSlice";
import { useAppDispatch } from "@/app/GlobalRedux/hooks";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

// Adjust IProduct interface to match the Product type
interface IProduct {
  _id: string; // Include _id
  name: string;
  slug: string;
  photos: string[];
  description: string;
  metaKey: string;
  price: number;
  discount: number;
  stockStatus: boolean;
  status: boolean;
  quantity?: number; // Optionally include quantity
}

const FeaturesDemo = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();

  const handleAddProduct = () => {
    const productWithQuantity = {
      ...product,
      quantity: product.quantity || 1, // Ensure quantity is set
    };

    dispatch(addToCart(productWithQuantity));
    toast.success("Product Added");
  };

  return (
    <>
      <div>
        <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
          <Link
            href={`/product/product-details/${product._id}`}
            className="w-full"
          >
            <Image
              src={product?.photos[0]}
              alt="product"
              width={150}
              height={150}
            />
            <h1 className="text-xl font-semibold">{product?.name}</h1>
          </Link>
          <p>{product?.slug || "N/A"}</p>
          <p className="text-2xl">Price: ${product?.price}</p>
          <button
            onClick={handleAddProduct}
            className="px-6 py-2 uppercase transition duration-200 ease-in border-2 border-gray-900 rounded-full hover:bg-gray-800 hover:text-white focus:outline-none"
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default FeaturesDemo;
