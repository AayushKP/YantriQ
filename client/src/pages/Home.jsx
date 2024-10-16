import Header from "../components/Header";
import { GoNorthStar } from "react-icons/go";

function Home() {
  return (
    <div className="min-h-screen w-full bg-[#000000] relative overflow-x-hidden">
      <div
        className="absolute h-1/3 inset-0 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: "url('/home/bg-1.png')" }}
      ></div>

      <div
        className="absolute h-2/3 inset-0 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: "url('/home/bg-1.png')" }}
      ></div>

      {/* Content that will appear over the images */}
      <div className="relative z-10">
        <div className="mt-9 mx-10">
          <Header />
        </div>
        <div className="mt-8 flex flex-row gap-5 h-96 rounded-xl box-border bg-[#000000] mx-10">
          <div className="w-7/12 rounded-xl bg-[#D9D9D9]"></div>
          <div className="w-5/12 rounded-xl bg-[#D9D9D9]"></div>
        </div>

        {/* Ticker Section */}
        <div className="w-full bg-[#C6F806] h-10 mt-5 flex items-center overflow-hidden">
          <div className="flex animate-ticker whitespace-nowrap">
            <TickerText />
            <TickerText />
            <TickerText />
            {/* Duplicating for continuous scrolling */}
            <TickerText />
            <TickerText />
            <TickerText />
          </div>
        </div>

        <div className="mt-5 mx-10 h-80 flex items-center gap-5 mb-20">
          <Container />
          <Container />
          <Container />
          <Container />
        </div>
        <div className="h-50 bg-white mt-5 mb-80 mx-10">
          <img src="/home/bg-1.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;

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

function Container({ img }) {
  return (
    <div className="h-full w-1/4 bg-[#D9D9D9] rounded-xl">
      <img src="" alt="" className="h-full w-full rounded-xl" />
    </div>
  );
}
