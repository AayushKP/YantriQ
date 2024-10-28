import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useStore } from "../../store/store"; // Import useStore from Zustand
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useStore((state) => state.setUser); // Get setUser from Zustand store

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    const username = email.split("@")[0]; // Extract username from email
    console.log("Username before login:", username);

    try {
      const url = isSignup
        ? "http://localhost:5000/api/users/register"
        : "http://localhost:5000/api/users/login";

      const response = await axios.post(url, { email, password });

      // Check if the response structure matches your expectations
      const token = response.data.token; // Ensure this is where your token is coming from
      const userData = response.data.user; // Ensure this contains user info

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Store user details in Zustand (extract username and other details if needed)
      setUser({ username, token, ...userData }); // Use spread operator to include user data

      // Show alert to indicate successful login
      alert("User logged in successfully!");
      navigate("/cart");

      // Log the user immediately after setting it
      console.log("User logged in:", { username, token, ...userData });
    } catch (error) {
      console.error("Error during authentication:", error);

      if (error.response && error.response.status === 409) {
        alert("User already exists. Please log in instead.");
      } else {
        alert("Authentication failed. Please try again.");
      }
    }
  };

  return (
    <div
      className="h-full w-full rounded-xl bg-[#424242] relative py-14 px-28 flex items-center"
      style={{ boxShadow: "4.4px 4.4px 0 0 rgba(0, 0, 0, 1)" }}
    >
      <div className="absolute inset-0 top-10 left-3/4 flex items-center justify-center h-10 gap-3 w-32">
        <div className="h-6 w-6 border-4 border-black bg-[#00C44C] rounded-full"></div>
        <div className="h-6 w-6 border-4 border-black bg-[#F7B742] rounded-full"></div>
        <div className="h-6 w-6 border-4 border-black bg-[#F75D59] rounded-full"></div>
      </div>

      <div className="flex items-center h-full w-full flex-col px-15">
        <div className="text-4xl text-[#CEFF1A] font-work font-semibold">
          {isSignup ? "Sign Up" : "Login"}
        </div>
        <p className="mt-4 text-lg text-white">
          {isSignup
            ? "Fill in the details to get started"
            : "Log in to your account"}
        </p>
        <div className="mt-10 flex flex-col w-full gap-2">
          <label className="text-white text-md" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="h-12 border border-[#000000] shadow-lg p-5"
            name="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-4 flex flex-col w-full gap-2">
          <label className="text-white text-md" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="h-12 border border-[#000000] shadow-lg p-5"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="m-6 w-4/5 flex items-center justify-center gap-4">
          <hr className="flex-grow" style={{ borderColor: "#666666" }} />
          <div className="text-[#666666] font-hyperlegible text-xl">OR</div>
          <hr className="flex-grow" style={{ borderColor: "#666666" }} />
        </div>
        <div className="rounded-full flex items-center justify-center gap-12">
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
          onClick={handleSubmit}
        >
          <div className="font-work">{isSignup ? "Sign Up" : "Log In"}</div>
        </div>
        <div className="mt-8 flex justify-items-center">
          <p className="cursor-pointer text-white font-light text-lg">
            {isSignup ? "Already a user? " : "Don't have an account? "}
            <span
              className="font-semibold"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Log In" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
