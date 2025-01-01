import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./component/Login";
import { Home } from "./component/Home";
import { SignUp } from "./component/SignUp";
import { DashBoard } from "./component/DashBoard";
import { Uploads } from "./component/Uploads";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("documents.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); 

  console.log(data)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/uploads" element={<Uploads data={data} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
