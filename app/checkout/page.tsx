"use client";
import { useState } from "react";
import { useAppSelector } from "../GlobalRedux/hooks";
import Image from "next/image";
import Modal from "@/components/Modal/Modal";

interface Product {
  _id: string;
  name: string;
  photos: string[];
  price: number;
  quantity: number;
}

const Checkout = () => {
  const [scheduled, setScheduled] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUser = useAppSelector((state: any) => state.user.currentUser);
  const { products } = useAppSelector((state: any) => state.cart);

  const subtotal = products.reduce((acc: number, product: Product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const deliveryCost = 4.5;
  const total = subtotal + deliveryCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "https://medicine-e-commerce-server.vercel.app/api/v4/create-shipping",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser?._id,
            division: city,
            district: city,
            subDistrict: city,
            address,
            name: currentUser?.name,
            phone,
            paymentMethod,
            products: products.map((product: Product) => product.name),
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create shipping address");
      }

      const data = await response.json();
      setSuccess("Order placed successfully!");
      setIsModalOpen(true); // Open the modal on success
    } catch (err: any) {
      setError(err.message || "Failed to create shipping address");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center gap-5 p-20 sm:flex-row">
      <div className="w-full sm:w-1/2 md:max-w-3xl">
        <h1 className="mb-2">Delivery Information</h1>
        <form
          onSubmit={handleSubmit}
          className="h-[60vh] border border-gray-300 rounded-md p-10 overflow-auto"
        >
          <div className="flex gap-5">
            <div className="w-full space-y-5">
              <div>
                <label htmlFor="userName">
                  Name: <b>{currentUser?.name}</b>
                </label>
                <input
                  type="text"
                  id="userName"
                  className="mt-2"
                  defaultValue={currentUser?.name}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="userEmail">
                  Email: <b>{currentUser?.email}</b>
                </label>
                <input
                  type="text"
                  id="userEmail"
                  className="mt-2"
                  defaultValue={currentUser?.email}
                  readOnly
                />
              </div>
            </div>
            <div className="w-full space-y-5">
              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  className="mt-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  className="mt-2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              className="mt-2 w-full rounded-md border p-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mt-3">
            <label className="text-lg">Payment method</label>
            <div className="flex gap-5 mt-5">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="r1"
                  name="paymentMethod"
                  value="Online Payment"
                  checked={paymentMethod === "Online Payment"}
                  onChange={() => setPaymentMethod("Online Payment")}
                  className="border border-gray-400"
                />
                <label htmlFor="r1">Online payment</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="r2"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={() => setPaymentMethod("Cash on Delivery")}
                  className="border border-gray-400"
                />
                <label htmlFor="r2">Cash on delivery</label>
              </div>
            </div>
          </div>

          {error && <div className="text-red-600 mt-4">{error}</div>}
          {success && <div className="text-green-600 mt-4">{success}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 inline-flex w-full items-center justify-center rounded bg-lime-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-lime-500 sm:text-lg ${
              loading ? "bg-gray-400" : ""
            }`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
      <div className="w-full sm:w-1/2 md:max-w-lg">
        <h1 className="mb-2 text-center sm:text-left">Order Summary</h1>
        <div className="border border-gray-300 rounded-md h-[60vh] p-10 flex flex-col">
          <div className="flex-grow mb-2 space-y-2 overflow-auto">
            {products.map((product: Product) => (
              <div
                key={product._id}
                className="flex justify-between items-center bg-gray-100 p-1 rounded-lg"
              >
                <div className="flex items-center">
                  <Image
                    src={product.photos[0] || "/fallback-image.jpg"} // Fallback if image is not available
                    className="h-[82px] rounded-md mr-2"
                    alt={product.name}
                    width={82}
                    height={82}
                  />
                  <div>
                    <h1 className="text-lg mb-2">{product.name}</h1>
                    <p>Price: {product.price.toFixed(2)}$</p>
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl mr-5">{product.quantity}</h1>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-lg">
              <p>Subtotal</p>
              <p>{subtotal.toFixed(2)}$</p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Delivery</p>
              <p>{deliveryCost.toFixed(2)}$</p>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <p>Total</p>
              <p>{total.toFixed(2)}$</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={success || ""}
      />
    </div>
  );
};

export default Checkout;
