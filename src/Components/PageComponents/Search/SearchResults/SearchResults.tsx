import axios from "axios";
import * as React from "react";
import { useParams } from "react-router-dom";
import User from "../../../../models/User.model";
import Account from "../../../Account/Account";
import SearchCard from "./SearchCard/SearchCard";

export default function SearchResult() {
  const { searchQuery } = useParams();

  const [results, setResults] = React.useState<User[]>();

  React.useEffect(() => {
    axios
      .get(`http://localhost:8000/users/search/${searchQuery}`)
      .then((searchResults) => {
        setResults(searchResults.data);
      });
    return () => {};
  }, []);

  return (
    <div className="search-results pt-20 pb-20 pl-10 pr-10">
      <h1 className="font-bold text-5xl mb-10 text-center">
        Search Results For: {searchQuery}
      </h1>
      {results ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 results">
          {results.map((user) => {
            return (
              <SearchCard
                key={user._id}
                id={user._id}
                fullname={user.fullname}
                profession={user.profession}
                username={user.username}
                accountType={user.accountType}
                image={user.profileImage}
              ></SearchCard>
            );
          })}
        </div>
      ) : (
        <div className="loader-container">
          <div
            className="loader
      "
          ></div>
        </div>
      )}
    </div>
  );
}
