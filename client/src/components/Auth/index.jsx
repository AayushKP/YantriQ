import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

function Auth({ text }) {
  return (
    <div
      className="h-full w-full rounded-xl bg-[#424242] relative py-14 px-28 flex  items-center"
      style={{ boxShadow: "4.4px 4.4px 0 0 rgba(0, 0, 0, 1)" }}
    >
      <div className="absolute inset-0 top-10 left-3/4 flex items-center justify-center h-10 gap-3 w-32 ">
        <div className="h-6 w-6 border-4 border-black bg-[#00C44C] rounded-full"></div>
        <div className="h-6 w-6 border-4 border-black bg-[#F7B742] rounded-full"></div>
        <div className="h-6 w-6 border-4 border-black  bg-[#F75D59] rounded-full"></div>
      </div>

      <div className="flex  items-center h-full w-full flex-col px-15 ">
        <div className="text-4xl text-[#CEFF1A] font-work font-semibold">
          Sign Up
        </div>
        <p className="mt-4 text-lg text-white">Ohh App Pheli Baar Ayee Hai !</p>
        <div className="mt-10 flex flex-col w-full gap-2 ">
          <label className="text-white text-mdnp " htmlFor="email">
            Email
          </label>
          <input
            type="text"
            className="h-12 border border-[#000000] shadow-lg stroke-[#000000]-0.5 p-5"
            name="email"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="mt-4 flex flex-col w-full gap-2 ">
          <label className="text-white text-md" htmlFor="email">
            Password
          </label>
          <input
            type="text"
            className="h-12 border border-[#000000] shadow-lg stroke-[#000000]-0.5 p-5"
            name="email"
            placeholder="password"
          />
        </div>
        <div className="m-6 w-4/5 flex items-center justify-center gap-4">
          <hr className="flex-grow " style={{ borderColor: "#666666" }} />
          <div className="text-[#666666] font-hyperlegible text-xl">OR</div>
          <hr className="flex-grow " style={{ borderColor: "#666666" }} />
        </div>
        <div className="rounded-full flex items-center justify-center gap-12 ">
          <div
            className="bg-white p-2 rounded-full cursor-pointer shadow-xl"
            style={{ boxShadow: "3.77px 3.77px 0 0 rgba(0, 0, 0, 1)" }}
          >
            <FcGoogle className="h-14 w-14" />
          </div>
          <div
            className="bg-white p-2 rounded-full cursor-pointer shadow-xl"
            style={{ boxShadow: "3.77px 3.77px 0 0 rgba(0, 0, 0, 1)" }}
          >
            <FaApple className="h-14 w-14" />
          </div>
        </div>
        <div
          className="mt-8 w-full bg-[#FF01C4] h-11 cursor-pointer rounded-lg border border-black flex justify-center items-center shadow-2xl"
          style={{ boxShadow: "4.4px 4.4px 0 0 rgba(0, 0, 0, 1)" }}
        >
          <div className="font-work">Sign Up</div>
        </div>
        <div className="mt-8 flex justify-items-center ">
          <p className=" cursor-pointer text-white font-light text-lg ">
            Nahi main toh purana customer hoon apka<span>{" ->"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Auth;
