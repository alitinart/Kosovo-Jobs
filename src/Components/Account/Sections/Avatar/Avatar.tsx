import axios from "axios";
import * as React from "react";
import Bio from "./Bio/Bio";
import Profession from "./Profession/Profession";

export default function Avatar(props: any) {
  return (
    <div className="avatar-container">
      <div
        className="banner"
        style={{
          backgroundImage: "url(" + props.bannerImage + ")",
        }}
      >
        {props.edit ? (
          <div
            className="edit"
            onClick={() => {
              props.uploadType("Banner");
            }}
          >
            <i className="bi bi-pencil"></i>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="user-info">
        <div className="avatar">
          <div
            className="profile-image"
            style={{
              backgroundImage: "url(" + props.userPfp + ")",
            }}
          >
            {props.edit ? (
              <div
                className="edit-pfp"
                onClick={() => {
                  props.uploadType("Profile Photo");
                }}
              >
                <i className="bi bi-pencil"></i>
              </div>
            ) : (
              <></>
            )}
          </div>
          <h1 className="full-name">
            {props.userObject.fullname}
            <Profession
              userObject={props.userObject}
              currentUser={props.currentUser}
              edit={props.edit}
              updateUser={() => {
                props.updateUser();
              }}
            />
          </h1>
        </div>
        <Bio
          userObject={props.userObject}
          currentUser={props.currentUser}
          edit={props.edit}
          updateUser={() => {
            props.updateUser();
          }}
        />
      </div>
    </div>
  );
}
