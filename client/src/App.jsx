import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import { useEffect, useState } from "react";
import { useStore } from "./store/store"; // Import your Zustand store
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const user = useStore((state) => state.user); // Get user from Zustand store

  if (!user?.token) {
    alert("Please login to access this page."); // Show alert if not logged in
    return <Navigate to="/" />; // Redirect to Home if not logged in
  }

  return children; // Return the requested element if logged in
};

const App = () => {
  const { user, setUser } = useStore(); // Assume this sets user in Zustand store
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/users/getUser", {
          headers: { Authorization: `Bearer ${token}` }, // Include token in headers
          withCredentials: true,
        });

        if (res.status === 200 && res.data) {
          setUser(res.data); // Set user data in Zustand store
        } else {
          setUser(null); // Ensure user is null if response is not valid
          console.log(user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error); // Debugging line
        setUser(null); // Set user to null on error
      } finally {
        setLoading(false);
      }
    };

    fetchUserData(); // Fetch user data on component mount
  }, [setUser]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching user data
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/products/:id" element={<Product />} />

        {/* Protected routes with authentication check */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />

        {/* Redirect any undefined routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
