import { GoNorthStar } from "react-icons/go";
import Header from "../components/Header";

function Product() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#000000]">
      <div className="mt-9 mx-10">
        <Header />
      </div>

      {/* Main content container */}
      <div
        className="mt-12 mx-10  grid grid-rows-4 gap-4 grid-flow-col box-border overflow-hidden relative p-0"
        style={{ height: "950px" }}
      >
        <div
          className="row-span-4 rounded-xl grid"
          style={{
            backgroundImage: "url('/product/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="row-span-1  bg-[#E7E6E9] rounded-xl"></div>
        <div className="row-span-3  rounded-xl bg-[#424242]"></div>
      </div>

      <div className="mt-6 mx-10 bg-[#424242] h-80 rounded-xl"></div>

      {/* Scrolling ticker */}
      <div className="w-full bg-[#C6F806] h-10 mt-5 flex items-center overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          <TickerText text1="Similar" text2="Products" text3="trending" />
          <TickerText text1="Similar" text2="Products" text3="trending" />
          <TickerText text1="Similar" text2="Products" text3="trending" />
          <TickerText text1="Similar" text2="Products" text3="trending" />
          <TickerText text1="Similar" text2="Products" text3="trending" />
          <TickerText text1="Similar" text2="Products" text3="trending" />
        </div>
      </div>

      {/* Horizontal scrollable div containing ProductItems */}
      <div
        className="ml-10 mt-10  h-96 box-border flex gap-4 overflow-x-auto mb-16 scroll-smooth hide-scrollbar"
        style={{
          width: "100vw",
          marginRight: "10px", // Adds margin to the right of the parent div
        }}
      >
        {/* Fixed width ProductItems */}
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </div>
  );
}

export default Product;

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

function ProductItem() {
  return (
    <div
      className="h-full border border-red-800 items-center rounded-xl cursor-pointer bg-[#FFFFFF]"
      style={{
        minWidth: "340px", // Ensures each item has a fixed width of 360px
      }}
    >
      {/* Add your product content here */}
    </div>
  );
}
