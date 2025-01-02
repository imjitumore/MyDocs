import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import {
  adhar, pan, vote, driving, atm, x, dimploma, bachelor, master, template
} from "../assets/imagePath";
import { URL } from "../assets/config";

export const Home = () => {
  const [documentTypes, setDocumentTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleActionClick = (documentType, isUploaded) => {
    if (isUploaded) {
      navigate("/document", { state: { documentType } });
    } else {
      navigate("/uploads", { state: { documentType } });
    }
  };
  

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const response = await fetch(`${URL}/documents`);
        const result = await response.json();

        if (response.ok) {
          setDocumentTypes(result.data);
        } else {
          console.error("Failed to fetch documents:", result.message);
          setError("Failed to fetch document types.");
        }
      } catch (error) {
        console.error("Error fetching document types:", error);
        setError("Error fetching document types.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentTypes();
  }, []);

  if (loading) {
    return <p>Loading documents...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className="my-2">
          <img src={template} alt="Template" />
        </div>
        <Section
          title="Regular Documents"
          documents={documentTypes.slice(0, 5)}
          onActionClick={handleActionClick}
        />
        <Section
          title="Academic Documents"
          documents={documentTypes.slice(5)}
          onActionClick={handleActionClick}
        />
      </div>
    </>
  );
};

const Section = ({ title, documents, onActionClick }) => (
  <div className="sm:w-[80%] w-[90%] mx-auto">
    <h1 className="text-2xl font-semibold my-2 sm:px-0 px-10">{title}</h1>
    <div className="grid sm:grid-cols-5 grid-cols-2 w-full justify-around my-5 overflow-hidden">
      {documents.map((doc) => (
        <DocumentCard
          key={doc._id}
          documentType={doc.name}
          isUploaded={doc.isUpload}
          onActionClick={onActionClick}
        />
      ))}
    </div>
    <hr style={{ borderWidth: "1.3px", color: "black" }} />
  </div>
);

const DocumentCard = ({ documentType, isUploaded, onActionClick }) => {
  const images = {
    "Aadhaar Card": adhar,
    "Pan Card": pan,
    "Voting Card": vote,
    "Driving Licence": driving,
    "Credit Card": atm,
    "10th": x,
    "12th": x,
    "Diploma": dimploma,
    "Bachelor Degree": bachelor,
    "Masters Degree": master,
  };

  const imageSrc = images[documentType] || template;

  return (
    <div className="text-center my-2">
      <div className="flex justify-center">
        <img className="h-20" src={imageSrc} alt={`${documentType} Icon`} />
      </div>
      <p className="my-1 font-semibold">{documentType}</p>
      <button
        className={`py-2 px-4 ${isUploaded ? "bg-green-500" : "bg-[#4947F0]"} text-white font-semibold rounded-sm text-sm`}
        onClick={() => onActionClick(documentType, isUploaded)}
      >
        {isUploaded ? "View Document" : "Upload Document"}
      </button>
    </div>
  );
};
