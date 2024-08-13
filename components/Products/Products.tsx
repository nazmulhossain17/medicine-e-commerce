import { addToCart } from "@/app/GlobalRedux/features/cart/cartSlice";
import { useAppDispatch } from "@/app/GlobalRedux/hooks";
import Link from "next/link";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  name: string;
  slug: string;
  photos: string[];
  description: string;
  metaKey: string;
  price: number;
  discount: number;
  stockStatus: boolean;
  status: boolean;
}

const Products = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const handleAddProduct = (product: any) => {
    dispatch(addToCart(product));
    toast.success("Product Added!");
  };

  return (
    <>
      <div>
        <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2 mb-3">
          <Link
            href={`/product/product-details/${product._id}`}
            className="w-full hover:text-purple-700"
          >
            <img src={product?.photos[0]} alt="product" />
            <h1 className="text-xl font-semibold">{product?.name}</h1>
          </Link>
          <p>{product?.slug}</p>
          <p> {product?.metaKey}</p>

          <p className="text-sm">Price: ${product?.price}</p>
          <button
            onClick={() => handleAddProduct(product)}
            className="px-6 py-2 uppercase transition duration-200 ease-in border-2 border-gray-900 rounded-full hover:bg-gray-800 hover:text-white focus:outline-none"
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;
