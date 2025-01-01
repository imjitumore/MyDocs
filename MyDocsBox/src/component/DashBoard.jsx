import React, { useState, useEffect } from "react";
import logo from "/mydocs.png";
import { Link, useNavigate } from "react-router-dom";

export const DashBoard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse the JSON string into an object
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <>
      <div className="py-1 flex justify-between bg-white items-center sm:px-10 px-4 shadow-md sticky top-0">
        <ul>
          <li>
            <Link to={"/"}>
              <img className="sm:h-12 h-10" src={logo} alt="Logo" />
            </Link>
          </li>
        </ul>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <p>{user.email}</p>
              <button
                className="text-white bg-[red] py-1.5 px-6 font-semibold rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};
