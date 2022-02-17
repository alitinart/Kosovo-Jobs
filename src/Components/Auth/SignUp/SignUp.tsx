import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [hidePassword, setHidePassword] = React.useState("password");
  const [hideRetype, setHideRetype] = React.useState("password");
  const [error, setError] = React.useState("");

  let username = "";
  let email = "";
  let password = "";
  let retype = "";
  let accountType = "";

  const nav = useNavigate();

  const onChange = (event: any, field: string) => {
    switch (field) {
      case "username":
        username = event.target.value;
        break;
      case "email":
        email = event.target.value;
        break;
      case "password":
        password = event.target.value;
        break;
      case "accountType":
        accountType = event.target.value;
        break;
      case "retype":
        retype = event.target.value;
        break;
      default:
        alert("Error Occurred");
    }
  };

  const signUp = (event: any) => {
    event.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password,
      accountType: accountType,
    };
    if (retype === password) {
      axios
        .post("http://localhost:8000/users", { data }, {})
        .then((resData) => {
          nav("/auth/login");
        })
        .catch((err) => {
          setError(() => {
            return "A user with that email already exists";
          });
        });
    } else {
      setError("Passwords don't match");
    }
  };

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
          signUp(event);
        }}
        className="form"
      >
        <h1 className="text-6xl font-bold text-center mb-5">Sign Up</h1>
        <input
          type={"text"}
          placeholder="Full Name"
          required
          onChange={(event) => {
            onChange(event, "username");
          }}
        />
        <input
          type={"email"}
          placeholder="Email"
          required
          onChange={(event) => {
            onChange(event, "email");
          }}
        />
        <div className="form-password">
          <input
            type={hidePassword}
            className="form-control password-field"
            placeholder="Password"
            onChange={(event) => {
              onChange(event, "password");
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
        <div className="form-password">
          <input
            type={hideRetype}
            className="form-control password-field"
            placeholder="Retype Password"
            required
            onChange={(event) => {
              onChange(event, "retype");
            }}
          />
          <div className="status-button">
            <button
              type="button"
              onClick={() => {
                changeFieldStatus("retype");
              }}
            >
              <i className="bi bi-eye"></i>
            </button>
          </div>
        </div>
        <select
          className="form-control"
          required
          onChange={(event) => {
            onChange(event, "accountType");
          }}
        >
          <option value={"business"}>Business</option>
          <option value={"individual"}>Individual</option>
        </select>
        <p className="mb-2">
          Already have a account ?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => {
              nav("/auth/login");
            }}
          >
            Login
          </span>
        </p>
        <button className="btn w-full">Submit</button>
      </form>
    </div>
  );
}
