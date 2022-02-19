import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [hidePassword, setHidePassword] = React.useState("password");
  const [hideRetype, setHideRetype] = React.useState("password");
  const [error, setError] = React.useState("");

  const nav = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // const onChange = (event: any, field: string) => {
  //   switch (field) {
  //     case "email":
  //       email = event.target.value;
  //       break;
  //     case "password":
  //       password = event.target.value;
  //       break;
  //     default:
  //       alert("Error Occurred");
  //   }
  // };

  const changeFieldStatus = (field: string) => {
    switch (field) {
      case "password":
        if (hidePassword === "password") {
          setHidePassword("text");
        } else {
          setHidePassword("password");
        }
        break;
      case "retype":
        if (hideRetype === "password") {
          setHideRetype("text");
        } else {
          setHideRetype("password");
        }
        break;
    }
  };

  const loginHandler = (event: any) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8000/users/login", { data }, {})
      .then((resData) => {
        if (resData.data === "Invalid Password") {
          setError("Invalid Password Entered");
          return;
        } else if (resData.data === "No User Found") {
          setError("No User Found with that email");
          return;
        }
        localStorage.setItem("tokenId", resData.data.refreshTokenId);
        localStorage.setItem("currentUser", resData.data.accessToken);
        window.location.href = "/";
      });
  };

  return (
    <div className="pt-20 signUp w-100">
      {error ? (
        <div className="error">
          <h1>{error}</h1>
        </div>
      ) : (
        <></>
      )}
      <form
        onSubmit={(event) => {
          loginHandler(event);
        }}
        className="form"
      >
        <h1 className="text-6xl font-bold text-center mb-5">Login</h1>
        <input
          type={"email"}
          placeholder="Email"
          required
          value={email}
          id="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <div className="form-password">
          <input
            type={hidePassword}
            className="form-control password-field"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
          />
          <div className="status-button">
            <button
              type="button"
              onClick={() => {
                changeFieldStatus("password");
              }}
            >
              <i className="bi bi-eye"></i>
            </button>
          </div>
        </div>
        <p className="mb-2">
          Don't have a account ?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => {
              nav("/auth/signUp");
            }}
          >
            Sign Up
          </span>
        </p>
        <button className="btn w-full">Submit</button>
      </form>
    </div>
  );
}
