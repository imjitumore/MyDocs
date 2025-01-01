import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Login = ({setUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  async function login(){
    try {
      const response = await fetch("http://localhost:5400/api/login",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({email,password})
      })
  
      const result = await response.json()
      console.log(result)
      toast.error(result.message);

      if (response.ok) {
        toast.success(result.message)
        navigate("/")
        localStorage.setItem("user", JSON.stringify(result.user));
  
        const loggedUser = JSON.parse(localStorage.getItem("user"));
        setUser(loggedUser)
        console.log(loggedUser);
    } else {
        console.error(data.message);
        toast.error(data.message);
    }
    } catch (error) {
    }
  }

 function handleSubmit()
 {
  login()
 }

 const notifySuccess = () => {
  toast.success('🦄 Wow! Operation successful!', {
    position: "top-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const notifyError = () => {
  toast.error('🚨 Error occurred!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

  return (
    <>
     <ToastContainer />
      <div>
        <p className="sm:text-5xl text-4xl sm:my-20 my-10 font-semibold text-center">Account</p>
      </div>
      <div className="sm:w-[40%] w-[80%] mx-auto">
        <p className="text-2xl  font-semibold">Sign IN</p>
        <p className="text-md text-sm">Insert your account information:</p>
        <div className="my-4">
          <input
            className="my-2 border-2 w-full py-2 px-3 border-black rounded-md"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className="my-2 border-2 w-full py-2 px-3 border-black rounded-md"
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
        </div>
        <p className="text-sm font-semibold cursor-pointer my-2">
          Forgot Your Password ?
        </p>
        <p className="sm:text-md text-sm">
          If you don't have an account, please{" "}
          <Link to={"/signup"}>
            {" "}
            <span className="font-semibold text-[#727272] underline">
              Register Here
            </span>{" "}
          </Link>
        </p>
        <div className="flex justify-center my-3    ">
          <button
            className="product_btn  sm:text-lg text-sm text-center border-2 border-[#2B5E5D] text-white  transition duration-1000 w-full rounded-lg  py-2 bg-[#2B5E5D] my-3"
            onClick={handleSubmit}
          >
            LOGIN
          </button>
        </div>
      </div>
    </>
  );
};
