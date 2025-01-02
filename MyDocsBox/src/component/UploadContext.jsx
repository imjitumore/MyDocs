import React, { createContext, useState, useContext } from "react";

const UploadContext = createContext();

export const useUploadContext = () => {
  return useContext(UploadContext);
};

export const UploadProvider = ({ children }) => {
  const [uploadedDocs, setUploadedDocs] = useState({
    "Aadhaar Card": false,
    "Pan Card": false,
    "Voting Card": false,
    // "Driving Licence": false,
    "Credit Card": false,
    "10th": false,
    "12th": false,
    "Diploma": false,
    "Bachelor Degree": false,
    "Masters Degree": false,
  });

  const updateUploadStatus = (documentType, status) => {
    setUploadedDocs((prev) => ({
      ...prev,
      [documentType]: status,
    }));
  };

  return (
    <UploadContext.Provider value={{ uploadedDocs, updateUploadStatus }}>
       {children}
     </UploadContext.Provider>
  );
};
