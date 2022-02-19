import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchCard(props: any) {
  const nav = useNavigate();

  const [profileImage, setProfileImage] = React.useState(
    "https://sankosf.com/wp-content/themes/gecko/assets/images/placeholder.png"
  );

  React.useEffect(() => {
    if (props.image) {
      setProfileImage(props.image);
    }
    return () => {};
  }, []);

  const cap = function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="search-card">
      <div className="main-info">
        <div
          className="profile-image"
          style={{ backgroundImage: "url(" + profileImage + ")" }}
        ></div>
        <div className="full-user">
          <p className="full-name">{props.fullname}</p>
          <p className="username">@{props.username}</p>
        </div>
      </div>
      <div className="extra-info bg-default">
        <p className="profession">{cap(props.accountType)}</p>
        <p className="profession">
          {props.profession ? props.profession : "No Profession Added"}
        </p>
      </div>
      <button
        className="btn w-full"
        onClick={() => {
          nav("/users/" + props.id);
        }}
      >
        View
      </button>
    </div>
  );
}
