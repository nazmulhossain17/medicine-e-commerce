"use client";
import { useAppDispatch, useAppSelector } from "../GlobalRedux/hooks";
import { useRouter } from "next/navigation";
import {
  addToCart,
  removeOne,
  removeFromCart,
} from "../GlobalRedux/features/cart/cartSlice";
import Image from "next/image";

interface Product {
  _id: string;
  photos: string[];
  name: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const { products, total } = useAppSelector((state: any) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const currentUser = useAppSelector((state: any) => state.user.currentUser);

  const handleCheckout = () => {
    if (currentUser) {
      router.push("/checkout");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="my-8">
      <div className="text-center my-8">
        <h2 className="text-3xl mb-2">Added Products</h2>
      </div>

      <div>
        {products.map((product: Product) => (
          <div
            className="border h-44 p-5 flex justify-between rounded-md"
            key={product._id}
          >
            <div className="border-r pr-5 shrink-0">
              {product.photos && product.photos.length > 0 ? (
                <Image
                  src={product.photos[0]}
                  width={150}
                  height={150}
                  alt={product.name}
                  className="h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-lg">
                  <span>No image available</span>
                </div>
              )}
            </div>
            <div className="px-2 w-full flex flex-col gap-3">
              <h1 className="text-2xl self-center">{product.name}</h1>
              <p>Quantity: {product.quantity || 0}</p>
              <p className="text-xl">
                Total Price: $
                {(product.price * (product.quantity || 0)).toFixed(2)}
              </p>
            </div>
            <div className="border-l pl-5 flex flex-col justify-between">
              <button
                className="bg-blue-500 rounded-2xl hover:bg-blue-700 text-white"
                onClick={() => dispatch(addToCart(product))}
              >
                +
              </button>
              <button
                className="bg-lime-500 rounded-2xl hover:bg-lime-700 text-white"
                onClick={() => dispatch(removeOne(product))}
              >
                -
              </button>
              <button
                onClick={() => dispatch(removeFromCart(product))}
                className="rounded-2xl hover:bg-red-400 text-white"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Total Price:
          <span className="ml-2">${(total ?? 0).toFixed(2)}</span>
        </h1>
      </div>

      <button
        onClick={handleCheckout}
        className="mt-4 inline-flex w-full items-center justify-center rounded bg-purple-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
