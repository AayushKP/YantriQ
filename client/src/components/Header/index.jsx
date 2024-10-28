import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Auth from "../Auth/index"; // Import the Auth component for the login modal
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/store"; // Import Zustand store

function Header() {
  const [showAuth, setShowAuth] = useState(false); // State to manage modal visibility
  const navigate = useNavigate();
  const { user, setUser } = useStore(); // Get user and setUser from Zustand store

  const handleLoginClick = () => {
    setShowAuth(true); // Open the modal
  };

  const closeAuth = () => {
    setShowAuth(false); // Close the modal
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    setUser(null); // Clear user from Zustand store
    alert("You have been logged out."); // Show logout alert
    navigate("/"); // Redirect to home or any other page after logout
  };

  return (
    <div className="relative">
      {/* Main Header Content */}
      <div className="w-full flex flex-row justify-between items-center">
        {/* Logo Container */}
        <div className="rounded-full bg-[#000000] cursor-pointer text-white px-8 py-1 font-hyperlegible flex justify-center items-center text-2xl border-2 border-[#929290] h-12 box-border">
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            YantriQ
          </div>
        </div>

        {/* Icons and Navigation */}
        <div className="flex flex-row items-center justify-between h-12 gap-5">
          {/* Social Icons */}
          <div className="flex flex-row rounded-full box-border bg-[#000000] cursor-pointer px-3 py-1 h-full gap-2 text-2xl border-2 border-[#929290]">
            <div className="flex items-center">
              <FaFacebook color="white" />
            </div>
            <div className="flex items-center">
              <FaInstagram color="white" />
            </div>
            <div className="flex items-center">
              <FaTwitter color="white" />
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="bg-[#393939] flex items-center gap-32 font-hyperlegible rounded-full h-full px-8">
            <div className="flex gap-8 flex-row text-md text-white cursor-pointer">
              <div
                className="text-center hover:text-black"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </div>
              <div
                className="text-center hover:text-black"
                onClick={() => {
                  navigate("/men");
                }}
              >
                Men
              </div>
              <div
                className="text-center hover:text-black"
                onClick={() => {
                  navigate("/women");
                }}
              >
                Women
              </div>
              <div
                className="text-center hover:text-black"
                onClick={() => {
                  navigate("/accessories");
                }}
              >
                Accessories
              </div>
            </div>

            {/* Search Box */}
            <div className="flex justify-center items-center">
              <input
                type="text"
                className="py-1 w-56 px-3 rounded-full"
                placeholder="Search..."
              />
              <button className="flex items-center justify-center rounded-full cursor-pointer ml-1 h-10">
                <img
                  src="/home/search.png"
                  alt="Search"
                  className="h-9 w-auto object-cover"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="bg-[#393939] flex items-center rounded-full h-12 px-3 font-hyperlegible py-1">
          {user ? ( // Check if user is logged in
            <div
              onClick={handleLogout} // Log out on click
              className="text-white text-md ml-5 mr-8 cursor-pointer"
            >
              Log out
            </div>
          ) : (
            <div
              onClick={handleLoginClick} // Open modal on click
              className="text-white text-md ml-5 mr-8 cursor-pointer"
            >
              Log in
            </div>
          )}

          <div className="flex flex-row items-center">
            <div>
              <img
                src="/home/line.png"
                alt=""
                className="h-8 rounded-full w-auto object-cover"
              />
            </div>
            <div className="flex flex-row ml-4 gap-1 cursor-pointer">
              <div>
                <img
                  src="/home/wishlist.png"
                  alt=""
                  className="h-10 w-auto object-cover"
                  onClick={() => {
                    navigate("/cart");
                  }}
                />
              </div>

              <div>
                <img
                  src="/home/orders.png"
                  alt=""
                  className="h-10 w-auto object-cover"
                  onClick={() => {
                    navigate("/orders");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal (Login) */}
      {showAuth && (
        <>
          {/* Background blur */}
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={closeAuth}
          ></div>

          {/* Modal box */}
          <div className="fixed inset-0 z-20 flex justify-center items-center">
            <div
              className="bg-transparent rounded-lg relative flex flex-row gap-8 p-8"
              style={{ width: "879.63px", height: "778.47px" }}
            >
              <div className="w-full">
                <Auth />
              </div>
              <button
                className="absolute top-4 right-4 text-white p-2 rounded-full"
                onClick={closeAuth}
              >
                <img src="/auth/close.png" alt="" className="h-12 w-12" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
