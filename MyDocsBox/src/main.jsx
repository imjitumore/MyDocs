import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UploadProvider } from './component/UploadContext';

ReactDOM.render(
  <UploadProvider>
    <App />
  </UploadProvider>,
  document.getElementById("root")
);
