import * as React from "react";
import { useParams } from "react-router-dom";

import auth from "./../../Assets/Auth/authSVG.png";

// 404 Page
import Home from "../Home/Home";

// Types of authentication
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

export default function Auth() {
  const { type } = useParams();

  return (
    <div className="auth">
      {type === "login" ? <Login /> : type === "signUp" ? <SignUp /> : <Home />}
      <img src={auth} className="w-50 ml-20" />
    </div>
  );
}
