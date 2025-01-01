import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import template from "/temp.jpg";
import adhar from "/Aadhaar.png";
import x from "/x.png";
import pan from "/pancard.webp";
import vote from "/Election.png";
import dimploma from "/degree.png";
import atm from "/creditcard.jpg";
import bachelor from "/bachelor.jpg";
import master from "/master.jpg";
import driving from "/driving.jpg";

export const Home = () => {
  const navigate = useNavigate();

  // Function to handle navigation to Uploads page
  const handleUploadClick = (documentType) => {
    navigate("/uploads", { state: { documentType } });
  };

  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className="my-2">
          <img src={template} alt="" />
        </div>
        <div className="sm:my-10 w-full">
          <div className="sm:w-[80%] w-[90%] mx-auto my-14">
            <h1 className="text-2xl font-semibold my-2 sm:px-0 px-10">Regular Documents</h1>
            <div className="grid sm:grid-cols-5 grid-cols-2 justify-around my-5">
              <div className="text-center my-2">
                <div className="flex justify-center">
                  <img className="h-20" src={adhar} alt="" />
                </div>
                <p className="my-1 font-semibold">Aadhaar card</p>
                <button
                  className="py-2 px-4 bg-[#4947F0] text-white font-semibold rounded-sm text-sm"
                  onClick={() => handleUploadClick("Aadhaar Card")}
                >
                  Upload Doc
                </button>
              </div>
              <div className="text-center my-2">
                <div className="flex justify-center">
                  <img className="h-20" src={pan} alt="" />
                </div>
                <p className="my-1 font-semibold">Pan card</p>
                <button
                  className="py-2 px-4 bg-[#4947F0] text-white font-semibold rounded-sm text-sm"
                  onClick={() => handleUploadClick("Pan Card")}
                >
                  Upload Doc
                </button>
              </div>
              <div className="text-center my-2">
                <div className="flex justify-center">
                  <img className="h-20" src={vote} alt="" />
                </div>
                <p className="my-1 font-semibold">Voting card</p>
                <button
                  className="py-2 px-4 bg-[#4947F0] text-white font-semibold rounded-sm text-sm"
                  onClick={() => handleUploadClick("Voting Card")}
                >
                  Upload Doc
                </button>
              </div>
              <div className="text-center my-2">
                <div className="flex justify-center">
                  <img className="h-20" src={driving} alt="" />
                </div>
                <p className="my-1 font-semibold">Driving licence</p>
                <button
                  className="py-2 px-4 bg-[#4947F0] text-white font-semibold rounded-sm text-sm"
                  onClick={() => handleUploadClick("Driving Licence")}
                >
                  Upload Doc
                </button>
              </div>
              <div className="text-center my-2">
                <div className="flex justify-center">
                  <img className="h-20" src={atm} alt="" />
                </div>
                <p className="my-1 font-semibold">Credit card</p>
                <button
                  className="py-2 px-4 bg-[#4947F0] text-white font-semibold rounded-sm text-sm"
                  onClick={() => handleUploadClick("Credit Card")}
                >
                  Upload Doc
                </button>
              </div>
            </div>
            <hr style={{ borderWidth: "1.3px", color: "black" }} />
          </div>
        </div>
        <div className="sm:w-[80%] w-[90%]  mx-auto">
            <h1 className="text-2xl font-semibold my-2 sm:px-0 px-10">Academic Documents</h1>
            <div className="grid sm:grid-cols-5 grid-cols-2 w-full justify-around my-5 overflow-hidden">
              <div className="text-center font-semibold w-full">
                <div className="flex justify-center ">
                  <img className="h-20" src={x} alt="" />
                </div>
                <p>
                  10 <sup>th</sup>
                </p>
                <button className="py-2 px-4 bg-[#4947F0] text-white font-semibold rounded-sm text-sm">
                  Upload Doc
                </button>
              </div>
              <div className="text-center font-semibold w-full">
                <div className="flex justify-center">
                  <img className="h-20" src={x} alt="" />
                </div>
                <p>
                  12 <sup>th</sup>
                </p>
                <button className="py-2 px-4 bg-[#4947F0] text-white font-semibold rounded-sm text-sm ">
                  Upload Doc
                </button>
              </div>
              <div className="text-center font-semibold w-full">
                <div className="flex justify-center">
                  <img className="h-20" src={dimploma} alt="" />
                </div>
                <p>Diploma</p>
                <button className="py-2 px-4 bg-[#4947F0] text-white font-semibold rounded-sm text-sm">
                  Upload Doc
                </button>
              </div>
              <div className="text-center font-semibold w-full">
                <div className="flex justify-center">
                  <img className="h-20" src={bachelor} alt="" />
                </div>
                <p className="w-full">Bachelor Degree</p>
                <button className="py-2 px-4 bg-[#4947F0] text-white font-semibold rounded-sm text-sm">
                  Upload Doc
                </button>
              </div>
              <div className="text-center font-semibold w-full">
                <div className="flex justify-center">
                  <img className="h-20" src={master} alt="" />
                </div>
                <p>Masters Degree</p>
                <button className="py-2 px-4 bg-[#4947F0] text-white font-semibold rounded-sm text-sm">
                  Upload Doc
                </button>
              </div>
            </div>
            <hr style={{ borderWidth: "1.3px", color: "black" }} />
        </div>
      
      </div>
    </>
  );
};
