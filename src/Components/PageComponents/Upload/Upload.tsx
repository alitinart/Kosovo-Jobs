import axios from "axios";
import * as React from "react";

import "./Upload.css";

export default function Upload(props: any) {
  const [image, setImage] = React.useState<any>();
  const [imageDisplay, setImageDisplay] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);

  const onChange = (event: any) => {
    if (event.target.files.length <= 0) {
      return;
    }

    const data = new FormData();
    data.append("file", event.target.files[0]);

    setImage(data);
    setImageDisplay(URL.createObjectURL(event.target.files[0]));
  };

  const uploadHandler = () => {
    if (!image) {
      alert("Upload Image First !");
      return;
    }
    switch (props.type) {
      case "Profile Photo":
        setLoading(true);
        axios({
          method: "PATCH",
          url: `http://localhost:8000/users/${props.userObject._id}/pfp`,
          data: image,
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${props.currentUser}`,
          },
        }).then((resData) => {
          localStorage.setItem("currentUser", resData.data);
          window.location.reload();
        });
        break;
      case "Banner":
        setLoading(true);
        axios({
          method: "PATCH",
          url: `http://localhost:8000/users/${props.userObject._id}/banner`,
          data: image,
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${props.currentUser}`,
          },
        }).then((resData) => {
          localStorage.setItem("currentUser", resData.data);
          window.location.reload();
        });
    }
  };

  return props.type && props.showUpload ? (
    <div className="upload">
      <i
        className="bi bi-x close-upload cursor-pointer"
        onClick={props.closeHandler}
      ></i>
      {!loading ? (
        <div className="upload-input">
          <h1 className="font-bold text-center text-4xl mb-5">
            Upload new {props.type}
          </h1>
          {image ? (
            <img className="uploaded-image mb-3" src={imageDisplay} />
          ) : (
            <> </>
          )}
          <label
            className="btn upload-lable cursor-pointer"
            htmlFor="upload-file"
          >
            <i className="bi bi-cloud-upload upload-icon"></i> Upload Image
          </label>
          <input
            id="upload-file"
            onChange={(event: any) => onChange(event)}
            type={"file"}
          />
          <button className="btn btn-success ml-5" onClick={uploadHandler}>
            Submit
          </button>
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  ) : (
    <></>
  );
}
