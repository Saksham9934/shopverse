import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import api from "../api/axios.js";
import ProductCard from "../components/ProductCard.jsx";
import Loader from "../components/Loader.jsx";

const categories = ["All", "Electronics", "Fashion", "Home & Kitchen", "Furniture"];

const HomePage = () => {
  const { keyword } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "All";

  const [data, setData] = useState({ products: [], page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (keyword) params.set("keyword", keyword);
        if (category && category !== "All") params.set("category", category);
        params.set("pageNumber", pageNumber);

        const { data } = await api.get(`/products?${params.toString()}`);
        setData(data);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword, category, pageNumber]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {!keyword && (
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl text-white p-10 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to ShopVerse</h1>
          <p className="text-brand-50 max-w-xl">Discover great deals on electronics, fashion, home essentials and more — all in one place.</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSearchParams({ category: cat, page: 1 })}
            className={`px-4 py-1.5 rounded-full text-sm border ${
              category === cat
                ? "bg-brand-600 text-white border-brand-600"
                : "bg-white text-gray-600 border-gray-300 hover:border-brand-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">
        {keyword ? `Search results for "${keyword}"` : "Latest Products"}
      </h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : data.products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {data.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {data.pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(data.pages).keys()].map((x) => (
                <button
                  key={x + 1}
                  onClick={() => setSearchParams({ category, page: x + 1 })}
                  className={`px-3 py-1 rounded border ${
                    data.page === x + 1
                      ? "bg-brand-600 text-white border-brand-600"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  {x + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
