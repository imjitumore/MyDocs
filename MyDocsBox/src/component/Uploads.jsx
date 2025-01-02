import React, { useRef, useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import fileup from "/file.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { URLPath } from "../assets/config";

export const Uploads = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  const userEmail = JSON.parse(localStorage.getItem("user"))?.email;
  const location = useLocation();
  const { documentType } = location.state || { documentType: "Unknown Document" };

  useEffect(() => {
    const fetchUploadedDocs = async () => {
      if (!userEmail) {
        alert("User not logged in.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`${URLPath}/uploads/${userEmail}`);
        const uploadedDocsFromServer = response.data.uploadedDocs || [];
        uploadedDocsFromServer.forEach((doc) => updateUploadStatus(doc, true));
      } catch (error) {
        console.error("Error fetching uploaded documents:", error);
      }
    };

    fetchUploadedDocs();
  }, [userEmail, navigate]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) =>
      [...prevFiles, ...droppedFiles].filter((file, index, self) =>
        index === self.findIndex((f) => f.name === file.name)
      )
    );
  };

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFileTypes = ["image/png", "image/jpeg", "application/pdf"];
    const invalidFiles = selectedFiles.filter((file) => !validFileTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      alert("Some files have invalid types.");
      return;
    }

    setFiles((prevFiles) =>
      [...prevFiles, ...selectedFiles].filter((file, index, self) =>
        index === self.findIndex((f) => f.name === file.name)
      )
    );
  };

  const handleUpload = async () => {
    if (!files.length) {
      alert("Please select at least one file.");
      return;
    }

    const formData = new FormData();
    formData.append("documentType", documentType);
    files.forEach((file) => formData.append("documents", file));

    try {
      setUploading(true);

      // Upload the files
      const response = await axios.post(
        `${URLPath}/uploads/${userEmail}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response)

      alert("Upload successful!");
      await axios.put(`${URLPath}/documents/${documentType}`, {
        isUpload: true,
      });

      navigate("/");
      setFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An error occurred. Please try again later.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <h1 className="text-center text-3xl my-6">Upload Your {documentType}</h1>
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
              <div className="flex justify-center">
                <img className="h-20" src={fileup} alt="" />
              </div>
              <h2 className="text-2xl">Drag and Drop your Files here</h2>
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
                  {file.name} ({(file.size / 1024).toFixed(2)} KB) - {file.type}
                  <button
                    className="ml-2 text-red-500"
                    onClick={() =>
                      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
                    }
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-center">
          <button
            className="border-2 bg-black text-white py-2 px-10"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : `Upload ${documentType}`}
          </button>
        </div>
      </div>
    </>
  );
};
