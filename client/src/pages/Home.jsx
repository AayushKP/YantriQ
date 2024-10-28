import Header from "../components/Header";
import { GoNorthStar } from "react-icons/go";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

// Import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Home() {
  const [products, setProducts] = useState({
    oversizedTShirts: [],
    regularTShirts: [],
    tops: [],
  });

  const [banner, setBanner] = useState([]); // State for banner images
  const [offers, setOffers] = useState([]); // State for offers texts
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch products, banner, and offers from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(
          "http://localhost:5000/api/users/products"
        );
        const bannersAndOffersResponse = await axios.get(
          "http://localhost:5000/api/users/bannersnoffers"
        );

        setProducts({
          oversizedTShirts: productsResponse.data.filter(
            (product) => product.category === "oversized t-shirts"
          ),
          regularTShirts: productsResponse.data.filter(
            (product) => product.category === "regular t-shirts"
          ),
          tops: productsResponse.data.filter(
            (product) => product.category === "tops"
          ),
        });

        setBanner(bannersAndOffersResponse.data.images); // Set banner images
        setOffers(bannersAndOffersResponse.data.texts); // Set offer texts
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/products/${id}`); // Navigate to the product page with the product ID
  };

  return (
    <div className="min-h-screen w-full bg-[#000000] relative overflow-x-hidden">
      <div
        className="absolute h-1/3 inset-0 bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/home/bg-1.png')" }}
      ></div>

      {/* Content that will appear over the images */}
      <div className="relative z-10">
        <div className="mt-9 mx-10">
          <Header />
        </div>

        <div className="mt-8 flex flex-row gap-5 mb-8 h-96 rounded-xl box-border bg-[#000000] mx-10">
          <div className="w-7/12 rounded-xl bg-[#D9D9D9]">
            <img
              src={banner[0]}
              alt="Banner 1"
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
          <div className="w-5/12 rounded-xl bg-[#D9D9D9]">
            <img
              src={banner[1]}
              alt="Banner 2"
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
        </div>

        {/* Ticker Section */}
        <div className="w-full bg-[#C6F806] mb-8 h-10 mt-5 flex items-center overflow-hidden">
          <div className="flex animate-ticker whitespace-nowrap">
            <TickerText />
            <TickerText />
            <TickerText />
            <TickerText />
            <TickerText />
            <TickerText />
          </div>
        </div>

        {/* Category 1: Oversized T-shirts */}
        <div className="mt-8 mb-8 mx-10 flex items-center">
          {offers[0] && <Offers text={offers[0]} />} {/* Display first offer */}
        </div>
        <ProductSlider
          products={products.oversizedTShirts}
          onProductClick={handleProductClick}
        />

        {/* Category 2: Regular T-shirts */}
        <div className="mt-8 mb-8 mx-10 flex items-center">
          {offers[1] && <Offers text={offers[1]} />}{" "}
          {/* Display second offer */}
        </div>
        <ProductSlider
          products={products.regularTShirts}
          onProductClick={handleProductClick}
        />

        {/* Category 3: Tops */}
        <div className="mt-8 mb-8 mx-10 flex items-center">
          {offers[2] && <Offers text={offers[2]} />} {/* Display third offer */}
        </div>
        <ProductSlider
          products={products.tops}
          onProductClick={handleProductClick}
        />
      </div>
    </div>
  );
}

export default Home;

// TickerText Component
function TickerText() {
  return (
    <div className="h-full box-border flex flex-row items-center gap-3 px-5">
      <div className="font-hyperlegible text-2xl font-extrabold">
        BestSeller
      </div>
      <div className="font-hyperlegible text-1xl">
        <GoNorthStar color="black" />
      </div>
      <div className="font-hyperlegible text-2xl font-extrabold">Trending</div>
      <div className="font-hyperlegible text-1xl">
        <GoNorthStar color="black" />
      </div>
      <div className="font-hyperlegible text-2xl font-extrabold">
        New Arrivals
      </div>
    </div>
  );
}

// ProductSlider Component
function ProductSlider({ products, onProductClick }) {
  return (
    <div className="mx-10">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={15}
        slidesPerView={4.5}
        navigation
        pagination={false}
        className="product-slider"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <Container
              img={product.images[0]}
              onClick={() => onProductClick(product._id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// Container Component for Product Images
function Container({ img, onClick }) {
  return (
    <div
      className="w-full bg-[#D9D9D9] rounded-xl cursor-pointer mx-auto"
      style={{ height: "420px" }}
      onClick={onClick} // Add onClick to handle product click
    >
      <img
        src={img ? img : "/product/product.png"}
        alt="Product"
        className="h-full w-full rounded-xl object-cover"
      />
    </div>
  );
}

// Offers Component
function Offers({ text }) {
  return (
    <div className="w-full h-28 bg-custom-gradient rounded-xl px-10 flex flex-row justify-between items-center">
      <div className="font-staatliches text-6xl text-white">{text}</div>
      <div className="w-60 cursor-pointer text-white flex justify-center items-center h-12 p-3 font-sans bg-[#D9D9D9]/25 rounded-full ">
        <span className="mr-4">Explore All </span>
        <img src="/home/Arrow.png" alt="" className="w-10 " />
      </div>
    </div>
  );
}
