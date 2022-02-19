import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./Components/Account/Account";
import ViewAccount from "./Components/Account/ViewAccount/ViewAccount";
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home/Home";
import Alert from "./Components/PageComponents/Alert/Alert";
import Footer from "./Components/PageComponents/Footer/Footer";
import Header from "./Components/PageComponents/Header/Header";
import Search from "./Components/PageComponents/Search/Search";
import SearchResult from "./Components/PageComponents/Search/SearchResults/SearchResults";
import Upload from "./Components/PageComponents/Upload/Upload";
import User from "./models/User.model";

function App() {
  const currentUser = localStorage.getItem("currentUser");
  const [alertText, setAlertText] = useState<string>("");
  const [userObject, setUserObject] = useState<User>();

  const [uploadType, setUploadType] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const [showSearch, setShowSearch] = useState(false);

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

  const closeUploadHandler = () => {
    setShowUpload(false);
  };

  const searchStatusHandler = () => {
    setShowSearch(!showSearch);
  };

  return (
    <BrowserRouter>
      <Search showSearch={showSearch} searchHandler={searchStatusHandler} />
      <Upload
        userObject={userObject}
        currentUser={currentUser}
        type={uploadType}
        showUpload={showUpload}
        closeHandler={closeUploadHandler}
      />
      <Header searchHandler={searchStatusHandler} />
      <Alert alert={alertText} />
      <Routes>
        <Route path="" element={<Home />} />
        <Route
          path="/account"
          element={<Account uploadType={uploadTypeHandler} />}
        />
        <Route path="/search/:searchQuery" element={<SearchResult />} />
        <Route path="/users/:accountId" element={<ViewAccount />} />
        <Route path="/auth/:type" element={<Auth />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
