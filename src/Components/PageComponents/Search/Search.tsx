import * as React from "react";
import { useNavigate } from "react-router-dom";

import "./Search.css";

export default function Search(props: any) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const nav = useNavigate();

  return props.showSearch ? (
    <div className="search">
      <i
        className="bi bi-x close-search cursor-pointer"
        onClick={props.searchHandler}
      ></i>
      <div className="search-input">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            props.searchHandler();
            nav("/search/" + searchQuery);
          }}
        >
          <h1 className="font-bold text-3xl text-center">Search</h1>
          <input
            type={"text"}
            className="form-control"
            placeholder="Search For Users"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
            required
          />
          <button className="btn w-full" type="submit">
            Search <i className="bi bi-search"></i>
          </button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
}
