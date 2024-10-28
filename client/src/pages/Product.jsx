import { GoNorthStar } from "react-icons/go";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Product Component
function Product() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#000000]">
      <div className="mt-9 mx-10">
        <Header />
      </div>

      {/* Main content container */}
      <div
        className="mt-12 mx-10 grid grid-rows-4 gap-4 grid-flow-col box-border overflow-hidden relative p-0"
        style={{ height: "950px" }}
      >
        {/* Background image overlay grid */}
        <div className="row-span-4 rounded-xl grid relative">
          <div
            className="absolute inset-0 grid grid-rows-4 gap-2 rounded-xl p-4"
            style={{
              backgroundImage: "url('/product/background.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Top div spanning 3 rows with main image */}
            <div className="row-span-3 bg-opacity-70 rounded-xl w-10/12 flex items-center justify-center overflow-hidden">
              {product?.images?.[0] && (
                <img
                  src={product.images[0]}
                  alt="Product Image"
                  className="object-cover w-full h-full rounded-xl"
                />
              )}
            </div>

            {/* Bottom three divs spanning 1 row with additional images */}
            <div className="grid grid-cols-3 gap-2 row-span-1 w-10/12">
              <div className="bg-opacity-70 bg-gray-700 flex items-center justify-center rounded-bl-xl overflow-hidden">
                {product?.images?.[1] && (
                  <img
                    src={product.images[1]}
                    alt="Product Image"
                    className="object-cover w-full h-full rounded-bl-xl"
                  />
                )}
              </div>
              <div className="bg-opacity-70 bg-gray-800 flex items-center justify-center overflow-hidden">
                {product?.images?.[2] && (
                  <img
                    src={product.images[2]}
                    alt="Product Image"
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <div className="bg-opacity-70 bg-gray-900 flex items-center justify-center rounded-br-xl overflow-hidden">
                {product?.images?.[3] && (
                  <img
                    src={product.images[3]}
                    alt="Product Image"
                    className="object-cover w-full h-full rounded-br-xl"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row-span-1 bg-[#E7E6E9] rounded-xl flex justify-center items-center"></div>
        <div className="row-span-3 rounded-xl bg-[#424242]"></div>
      </div>

      <div className="mt-6 mx-10 bg-[#424242] h-80 rounded-xl"></div>

      {/* Scrolling ticker */}
      <div className="w-full bg-[#C6F806] h-10 mt-5 flex items-center overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          <TickerText text1="Similar" text2="Products" text3="Trending" />
        </div>
      </div>

      {/* Horizontal scrollable div containing ProductItems */}
      <div
        className="ml-10 mt-10 h-96 box-border flex gap-4 overflow-x-auto mb-16 scroll-smooth hide-scrollbar"
        style={{ width: "100vw", marginRight: "10px" }}
      >
        {/* Pass the category to ProductItem */}
        <ProductItem category={product?.category} excludeId={product?._id} />
      </div>
    </div>
  );
}

export default Product;

// TickerText Component
function TickerText({ text1, text2, text3 }) {
  return (
    <div className="h-full box-border flex flex-row items-center gap-3 px-5">
      <div className="font-hyperlegible text-2xl font-extrabold">{text1}</div>
      <div className="font-hyperlegible text-1xl">
        <GoNorthStar color="black" />
      </div>
      <div className="font-hyperlegible text-2xl font-extrabold">{text2}</div>
      <div className="font-hyperlegible text-1xl">
        <GoNorthStar color="black" />
      </div>
      <div className="font-hyperlegible text-2xl font-extrabold">{text3}</div>
    </div>
  );
}

// ProductItem Component to fetch and display similar products
function ProductItem({ category, excludeId }) {
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (!category || !excludeId) return; // Ensure both category and excludeId are defined

      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/products/similar?category=${category}&excludeId=${excludeId}`
        );
        setSimilarProducts(response.data);
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };

    fetchSimilarProducts();
  }, [category, excludeId]);

  return (
    <div className="flex gap-4">
      {similarProducts.map((product) => (
        <div
          key={product._id}
          className="h-full border border-red-800 items-center rounded-xl cursor-pointer bg-[#FFFFFF]"
          style={{ minWidth: "340px" }}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-48 rounded-t-xl"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}