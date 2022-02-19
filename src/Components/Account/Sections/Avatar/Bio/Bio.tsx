import axios from "axios";
import React, { useEffect } from "react";

export default function Bio(props: any) {
  const [editBio, setEditBio] = React.useState(false);
  const [newBio, setNewBio] = React.useState(props.userObject.bio);

  const changeEditBioStatus = () => {
    setEditBio(!editBio);
  };

  const bioChangeHandler = () => {
    changeEditBioStatus();

    axios
      .patch(
        `http://localhost:8000/users/${props.userObject?._id}/`,
        {
          data: {
            bio: newBio,
          },
        },
        {
          headers: {
            authorization: `Bearer ${props.currentUser}`,
          },
        }
      )
      .then((resData) => {
        axios
          .post("http://localhost:8000/tokens/", {
            token: props.currentUser,
            userId: props.userObject._id,
          })
          .then((resData) => {
            localStorage.setItem("currentUser", resData.data);
            props.updateUser();
          });
      });
  };

  return (
    <div className="bio">
      {props.userObject.bio ? (
        !editBio ? (
          <div>
            <p className="bio-text">{props.userObject.bio}</p>{" "}
            {props.edit ? (
              <i
                className="bi bi-pencil edit-pencil"
                onClick={changeEditBioStatus}
              ></i>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div>
            <textarea
              className="add-info"
              value={newBio}
              onChange={(event) => {
                setNewBio(event.target.value);
              }}
            ></textarea>
            <i
              className="bi bi-check submit-icon"
              onClick={bioChangeHandler}
            ></i>
            <i
              className="bi bi-x cancle-icon"
              onClick={changeEditBioStatus}
            ></i>
          </div>
        )
      ) : !editBio ? (
        <div>
          <p style={{ display: "inline" }}>Add Bio</p>
          {props.edit ? (
            <i className="ml-2 bi bi-pencil" onClick={changeEditBioStatus}></i>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div>
          <textarea
            className="add-info"
            placeholder="Add Bio"
            value={newBio}
            onChange={(event) => {
              setNewBio(event.target.value);
            }}
          ></textarea>
          <i className="bi bi-check submit-icon" onClick={bioChangeHandler}></i>
          <i className="bi bi-x cancle-icon" onClick={changeEditBioStatus}></i>
        </div>
      )}{" "}
    </div>
  );
}
