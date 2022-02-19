import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [hidePassword, setHidePassword] = React.useState("password");
  const [hideRetype, setHideRetype] = React.useState("password");
  const [error, setError] = React.useState("");

  const [username, setUsername] = React.useState("");
  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [accountType, setAccountype] = React.useState("");

  const [retype, setRetype] = React.useState("");

  const nav = useNavigate();

  const signUp = (event: any) => {
    event.preventDefault();
    const data = {
      username: username,
      fullname: fullname,
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
          placeholder="Username"
          value={username}
          required
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type={"text"}
          placeholder="Full Name"
          value={fullname}
          required
          onChange={(event) => {
            setFullname(event.target.value);
          }}
        />
        <input
          type={"email"}
          placeholder="Email"
          value={email}
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <div className="form-password">
          <input
            type={hidePassword}
            className="form-control password-field"
            placeholder="Password"
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
        <div className="form-password">
          <input
            type={hideRetype}
            className="form-control password-field"
            placeholder="Retype Password"
            required
            onChange={(event) => {
              setRetype(event.target.value);
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
            setAccountype(event.target.value);
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
