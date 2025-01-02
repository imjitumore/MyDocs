import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "./Navbar";
import {
  adhar,
  pan,
  vote,
  driving,
  atm,
  x,
  dimploma,
  bachelor,
  master,
  template,
} from "../assets/imagePath";
import { URL } from "../assets/config";

export const DocumentDetails = () => {
  const [documentUrl, setDocumentUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = JSON.parse(localStorage.getItem("user"))?.email;
  const { documentType } = location.state || {};

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(
          `${URL}/uploads/${userEmail}/${documentType}`,
          { responseType: "blob" }
        );

        const contentType = response.headers["content-type"];
        if (
          contentType.startsWith("application/pdf") ||
          contentType.startsWith("image")
        ) {
          const fileUrl = URL.createObjectURL(response.data);
          setDocumentUrl(fileUrl);
        } else {
          setError("Unsupported file type.");
        }
      } catch (err) {
        console.error("Error fetching document:", err);
        setError("Failed to load document.");
      } finally {
        setLoading(false);
      }
    };

    if (!userEmail || !documentType) {
      alert("Invalid request.");
      navigate("/");
    } else {
      fetchDocument();
    }
  }, [userEmail, documentType, navigate]);

  const handleViewClick = () => {
    if (documentUrl) {
      window.open(documentUrl, "_blank");
    }
  };

  const handleUpdateClick = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("document", file);
    formData.append("documentType", documentType);

    try {
      setUpdating(true);
      const response = await axios.put(
        `${URL}/uploads/${userEmail}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Document updated successfully.");
        // Reload the updated document
        const updatedFileUrl = URL.createObjectURL(file);
        setDocumentUrl(updatedFileUrl);
      } else {
        alert("Failed to update document.");
      }
    } catch (err) {
      console.error("Error updating document:", err);
      alert("Error updating document.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading document...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const images = {
    "Aadhaar Card": adhar,
    "Pan Card": pan,
    "Voting Card": vote,
    "Driving Licence": driving,
    "Credit Card": atm,
    "10th": x,
    "12th": x,
    Diploma: dimploma,
    "Bachelor Degree": bachelor,
    "Masters Degree": master,
  };
  const imageSrc = images[documentType] || template;

  return (
    <>
      <Navbar />
      <div className="w-full">
        <h1 className="text-center text-3xl my-6">{documentType}</h1>
        <div className="flex justify-center my-4">
          <img className="h-40" src={imageSrc} alt={`${documentType} Icon`} />
        </div>
        <div className="flex justify-center gap-4">
          {documentUrl ? (
            <>
              <button
                onClick={handleViewClick}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                View Document
              </button>
              <a
                href={documentUrl}
                download={`${documentType}.pdf`}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Download Document
              </a>
              <label className="px-4 py-2 bg-yellow-500 text-white rounded-md cursor-pointer">
                Update Document
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleUpdateClick}
                  className="hidden"
                />
              </label>
            </>
          ) : (
            <p>No document to display.</p>
          )}
        </div>
        <div className="flex justify-center my-4">
          {updating && (
            <button className="text-xl text-center py-2 text-[#25d225]  font-semibold border-2 px-10 border-black">
              Updating document...
            </button>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};
