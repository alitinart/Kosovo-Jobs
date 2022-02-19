import axios from "axios";
import * as React from "react";
import SocialCardModel from "../../../../models/SocialCard.model";

export default function SocialCard(props: any) {
  const [url, setUrl] = React.useState("");
  const [showInput, setShowInput] = React.useState(false);

  const addSocial = () => {
    let currentSocials = props.userObject.socials;
    let newSocials: SocialCardModel = {
      name: props.name,
      socialImage: props.socialImage,
      url: url,
      linked: true,
    };
    let deletedIndex = 0;
    let deletedSocial = currentSocials.find(
      (social: SocialCardModel, index: number) => {
        if (social.name === newSocials.name) {
          deletedIndex = index;
          return social;
        }
      }
    );
    currentSocials.splice(deletedIndex, 1);
    currentSocials.unshift(newSocials);
    axios({
      method: "patch",
      url: `http://localhost:8000/users/${props.userObject._id}`,
      data: {
        data: {
          socials: [...currentSocials],
        },
      },
      headers: {
        authorization: `Bearer ${props.currentUser}`,
      },
    }).then((resData) => {
      localStorage.setItem("currentUser", resData.data);
      window.location.reload();
    });
  };

  return (
    <div className="bg-default social-card">
      <img src={props.socialImage} />
      <p className="mt-2 mb-2 font-bold text-2xl">{props.name}</p>
      {!showInput ? (
        !props.linked ? (
          <button
            className="btn"
            onClick={() => {
              setShowInput(true);
            }}
          >
            Connect
          </button>
        ) : (
          <button
            className="btn"
            onClick={() => {
              window.location.href = props.url;
            }}
          >
            Visit
          </button>
        )
      ) : (
        <div>
          <input
            className="form-control"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
            }}
            placeholder="Url"
          />
          <button className="btn" onClick={addSocial}>
            Submit
          </button>
          <button
            className="btn btn-danger ml-2"
            onClick={() => {
              setShowInput(false);
            }}
          >
            Cancle
          </button>
        </div>
      )}
    </div>
  );
}
