import { useState } from "react";
import Header from "../components/Header";

function Men() {
  const [img, setImg] = useState("");

  // Create an array with 12 items for the containers
  const containers = Array.from({ length: 12 }, (_, index) => index);

  return (
    <div className="mx-10">
      <div className="mt-9">
        <Header />
      </div>

      <div className="mt-10 grid grid-cols-4 gap-5 mb-10">
        {containers.map((_, index) => (
          <Container key={index} img={img} />
        ))}
      </div>
    </div>
  );
}

export default Men;

function Container({ img }) {
  return (
    <div
      className="w-full cursor-pointer bg-[#D9D9D9] rounded-xl mb-8"
      style={{ height: "401px" }}
    >
      <img src={img} alt="" className="h-full w-full rounded-xl object-cover" />
    </div>
  );
}
