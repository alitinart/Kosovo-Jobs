import axios from "axios";
import imageCompression from "browser-image-compression";
import * as React from "react";

import "./Upload.css";

export default function Upload(props: any) {
  const [dataUri, setDataUri] = React.useState<any>();
  const [image, setImage] = React.useState<any>();

  const fileToDataUri = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const onChange = (file: any) => {
    if (!file) {
      setDataUri("");
      return;
    }

    fileToDataUri(file).then((dataUri) => {
      setDataUri(dataUri);
      setImage(file);
    });
  };

  const uploadHandler = () => {
    switch (props.type) {
      case "Profile Photo":
        axios
          .patch(
            `http://localhost:8000/users/${props.userObject._id}`,
            {
              data: {
                profileImage: image,
              },
            },
            {
              headers: {
                authorization: `Bearer ${props.currentUser}`,
              },
            }
          )
          .then((resData) => {
            localStorage.setItem("currentUser", resData.data);
            window.location.href = "/account";
          });
        break;
      case "Banner":
        axios.patch(
          `http://localhost:8000/users/${props.userObject._id}`,
          {
            data: {
              banner: image,
            },
          },
          {
            headers: {
              authorization: `Bearer ${props.currentUser}`,
            },
          }
        );
    }
  };

  return props.type && props.showUpload ? (
    <div className="upload">
      <i
        className="bi bi-x close-upload cursor-pointer"
        onClick={props.closeHandler}
      ></i>
      <div className="upload-input">
        <h1 className="font-bold text-center text-4xl mb-5">
          Upload new {props.type}
        </h1>
        {dataUri ? (
          <img className="uploaded-image mb-3" src={dataUri} />
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
          onChange={(event: any) => onChange(event.target.files[0] || null)}
          type={"file"}
        />
        <button className="btn btn-success ml-5" onClick={uploadHandler}>
          Submit
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
}
