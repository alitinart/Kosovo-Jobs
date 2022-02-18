import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./Components/Account/Account";
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home/Home";
import Alert from "./Components/PageComponents/Alert/Alert";
import Header from "./Components/PageComponents/Header/Header";
import Upload from "./Components/PageComponents/Upload/Upload";
import User from "./models/User.model";

function App() {
  const currentUser = localStorage.getItem("currentUser");
  const [alertText, setAlertText] = useState<string>("");
  const [userObject, setUserObject] = useState<User>();

  const [uploadType, setUploadType] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/validateToken", {
        headers: {
          authorization: `Bearer ${currentUser}`,
        },
      })
      .then((resData) => {
        if (resData.data === "Forbbiden" && currentUser) {
          setAlertText("Session Expired");
          localStorage.removeItem("currentUser");
          window.location.href = "/auth/login";
        }
        setUserObject(resData.data._doc);
      });
    return () => {};
  }, []);

  const alertHanlder = (text: string) => {
    setAlertText(text);
  };

  const uploadTypeHandler = (text: string) => {
    setUploadType(text);
    setShowUpload(true);
  };

  const closeHandler = () => {
    setShowUpload(false);
  };

  return (
    <BrowserRouter>
      <Upload
        userObject={userObject}
        currentUser={currentUser}
        type={uploadType}
        showUpload={showUpload}
        closeHandler={closeHandler}
      />
      <Header />
      <Alert alert={alertText} />
      <Routes>
        <Route path="" element={<Home />} />
        <Route
          path="/account"
          element={<Account uploadType={uploadTypeHandler} />}
        />
        <Route path="/auth/:type" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
