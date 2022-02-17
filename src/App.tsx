import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./Components/Account/Account";
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home/Home";
import Alert from "./Components/PageComponents/Alert/Alert";
import Header from "./Components/PageComponents/Header/Header";

function App() {
  const currentUser = localStorage.getItem("currentUser");
  const [alertText, setAlertText] = useState<string>("");

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
        }
      });
    return () => {};
  }, []);

  const alertHanlder = (text: string) => {
    setAlertText(text);
  };

  return (
    <BrowserRouter>
      <Header />
      <Alert alert={alertText} />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/auth/:type" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
