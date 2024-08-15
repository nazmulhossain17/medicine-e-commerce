"use client";
import { useGetCategoriesQuery } from "@/app/GlobalRedux/features/api/apiSlice";
import Loader from "@/components/Loader/Loader";
import { useState } from "react";

const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    photos: "",
    description: "",
    metaKey: "",
    price: "",
    discount: "",
    stockStatus: true,
    status: true,
    category: "", // Single selected category
    variants: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch categories from the Redux store using the query hook
  const { data, isLoading, isError } = useGetCategoriesQuery(undefined);

  // Extract categories from the data object
  const categories =
    data?.categories && Array.isArray(data.categories) ? data.categories : [];

  console.log("Raw data:", data);
  console.log("Processed categories:", categories);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (
      e.target instanceof HTMLSelectElement &&
      (e.target as HTMLSelectElement).multiple
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: Array.from(
          (e.target as HTMLSelectElement).selectedOptions,
          (option: any) => option.value
        ),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log("Submitting form data:", formData); // Debugging

      const response = await fetch(
        "https://medicine-e-commerce-server.vercel.app/api/v3/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            photos: formData.photos
              ? formData.photos.split(",").map((photo) => photo.trim())
              : [],
            variants: formData.variants
              ? formData.variants.split(";").map((variant) => {
                  const [name = "", price = "0"] = variant.split(",");
                  return {
                    name: name.trim(),
                    price: parseFloat(price.trim()) || 0,
                  };
                })
              : [],
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create product");
      }

      const data = await response.json();
      setSuccess("Product created successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700"
            >
              Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="photos"
              className="block text-sm font-medium text-gray-700"
            >
              Photos (comma separated URLs)
            </label>
            <input
              type="text"
              id="photos"
              name="photos"
              value={formData.photos}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
              rows={3}
              required
            />
          </div>
          <div>
            <label
              htmlFor="metaKey"
              className="block text-sm font-medium text-gray-700"
            >
              Meta Key
            </label>
            <input
              type="text"
              id="metaKey"
              name="metaKey"
              value={formData.metaKey}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price" // This should match the key in your state
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700"
            >
              Discount
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Category
            </label>
            <div>
              {isLoading && <p>Loading...</p>}
              {isError && <p>Failed to load categories</p>}

              {!isLoading && !isError && categories.length > 0 ? (
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                >
                  <option value="">Select Category</option>
                  {categories.map((category: { _id: string; name: string }) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p>No categories found</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="variants"
              className="block text-sm font-medium text-gray-700"
            >
              Variants (name,price; name,price)
            </label>
            <input
              type="text"
              id="variants"
              name="variants"
              value={formData.variants}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <input
                type="checkbox"
                id="stockStatus"
                name="stockStatus"
                checked={formData.stockStatus}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 rounded"
              />
              <label
                htmlFor="stockStatus"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                In Stock
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="status"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 rounded"
              />
              <label
                htmlFor="status"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                Active
              </label>
            </div>
          </div>
        </div>

        {error && <div className="text-red-600 mt-4">{error}</div>}
        {success && <div className="text-green-600 mt-4">{success}</div>}

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-lime-600 px-4 py-2 text-base font-medium text-white shadow-sm ring-1 ring-lime-500 ring-offset-1 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed ${
            loading ? "cursor-wait" : ""
          }`}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default Create;
