import axios from "axios";
import React from "react";

export default function Profession(props: any) {
  const [editProfession, setEditProfession] = React.useState(false);
  const [newProfession, setNewProfession] = React.useState("");

  const changeEditProfessionStatus = () => {
    setEditProfession(!editProfession);
  };

  const professionChangeHanlder = () => {
    setEditProfession(!editProfession);

    axios
      .patch(
        `http://localhost:8000/users/${props.userObject?._id}/`,
        {
          data: {
            profession: newProfession,
          },
        },
        {
          headers: {
            authorization: `Bearer ${props.currentUser}`,
          },
        }
      )
      .then((resData) => {
        localStorage.removeItem("currentUser");
        localStorage.setItem("currentUser", resData.data);
        props.updateUser();
      });
  };

  return (
    <p className="profession">
      {props.userObject.profession ? (
        !editProfession ? (
          <div onClick={changeEditProfessionStatus}>
            <p style={{ display: "inline" }}>{props.userObject.profession}</p>{" "}
            <i className="bi bi-pencil edit-pencil"></i>
            <input style={{ display: "none" }} className="add-info" />
          </div>
        ) : (
          <div className="edit-profession">
            <p style={{ display: "none" }}>{props.userObject.profession}</p>{" "}
            <input
              style={{ display: "inline" }}
              className="add-info"
              value={newProfession}
              onChange={(event) => {
                setNewProfession(event.target.value);
              }}
              placeholder="Add Profession"
            />{" "}
            <i
              className="bi bi-check submit-icon"
              onClick={professionChangeHanlder}
            ></i>
            <i
              className="bi bi-x cancle-icon"
              onClick={changeEditProfessionStatus}
            ></i>
          </div>
        )
      ) : !editProfession ? (
        <div onClick={changeEditProfessionStatus}>
          <p style={{ display: "inline" }}>Add Profession</p>{" "}
          <i className="bi bi-pencil edit-pencil"></i>
          <input style={{ display: "none" }} className="add-info" />
        </div>
      ) : (
        <div className="edit-profession">
          <p style={{ display: "none" }}>Add Profession</p>
          <input
            style={{ display: "inline" }}
            className="add-info"
            value={newProfession}
            onChange={(event) => {
              setNewProfession(event.target.value);
            }}
            placeholder="Add Profession"
          />{" "}
          <i
            className="bi bi-check submit-icon"
            onClick={professionChangeHanlder}
          ></i>
          <i
            className="bi bi-x cancle-icon"
            onClick={changeEditProfessionStatus}
          ></i>
        </div>
      )}{" "}
    </p>
  );
}
