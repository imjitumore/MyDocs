import React, { useRef, useState } from "react";
import { Navbar } from "./Navbar";
import fileup from '/file.png'
import { useLocation } from "react-router-dom";


export const Uploads = ({ data }) => {
  const [files, setFiles] = useState([]);
  const inputRef = useRef();

  const location = useLocation();
  const { documentType } = location.state || { documentType: "Unknown Document" };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  return (
    <>
      <Navbar />
      <div>
        <h1 className="text-center text-3xl my-6 ">Upload Your {documentType}</h1>
        <div
          className="border-2 border-black p-4 sm:w-[40%] w-[70%] mx-auto my-7"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!files.length && (
            <div className="text-center">
                <div className="flex justify-center"><img className="h-20" src={fileup} alt="" /></div>
              <h2 className="text-2xl ">Drag and Drop your Files here</h2>
              <p className="my-2">OR</p>
              <input
                type="file"
                multiple
                hidden
                onChange={handleFileUpload}
                ref={inputRef}
              />
              <button
                className="border-2 border-black py-1 px-10"
                onClick={() => inputRef.current.click()}
              >
                Select Files
              </button>
            </div>
          )}
          {files.length > 0 && (
            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className=" flex justify-center">
          <button className="border-2 bg-black text-white py-2 px-10">Upload {documentType}</button>
        </div>
      </div>
    </>
  );
};
