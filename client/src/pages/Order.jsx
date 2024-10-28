import Header from "../components/Header";

function Order() {
  return (
    <div className="min-h-screen w-full bg-[#000000] relative overflow-x-hidden">
      <div
        className="absolute inset-0 bg-no-repeat bg-center "
        style={{ backgroundImage: "url('/home/bg-2.png')" }}
      ></div>

      {/* Content that will appear over the images */}
      <div className="relative z-10">
        <div className="mt-9 mx-10">
          <Header />
          <div className="mt-10 p-1 bg-[#FAFF0A] rounded-lg w-64 text-xl text-center font-work font-semibold cursor-pointer">
            My Orders
          </div>
          <div className="flex gap-6 flex-row my-8">
            <div className="flex flex-col w-2/3 border border-red-900 gap-8 cursor-pointer">
              <OrderProduct />
              <OrderProduct />
              <OrderProduct />
            </div>
            <div className="flex flex-col w-1/3 border border-red-900 h-96"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderProduct({ img, title, size, price, qty }) {
  return (
    <div className="bg-[#424242] rounded-lg h-72 flex flex-row px-3 py-5 justify-start">
      <div className="h-full w-60 border border-red-800">{img}</div>
      <div className="ml-5 h-full w-3/4 border border-red-800 mr-10 flex-col justify-start">
        <div className="mt-2 h-20 w-full border border-red-900 text-2xl">
          {title}
        </div>
        <div className="flex flex-row gap-6 ">
          <div className="border border-red-800 w-16 h-8"></div>
          <div className="border border-red-800 w-16 h-8"></div>
        </div>
        <div className="mb-0 border border-red-800 h-10 w-10"></div>
      </div>
      <div className="flex items-center justify-center border border-red-900 h-10 gap-3 w-32 ">
        <div className="h-4 w-4 border-4 border-black bg-[#00C44C] rounded-full"></div>
        <div className="h-4 w-4 border-4 border-black bg-[#F7B742] rounded-full"></div>
        <div className="h-4 w-4 border-4 border-black  bg-[#F75D59] rounded-full"></div>
      </div>
    </div>
  );
}

export default Order;
