import axios from "axios";
import * as React from "react";
import Experience from "../../../../models/Experience.model";

export default function AddExperience(props: any) {
  const [showFields, setShowFields] = React.useState(false);

  const [name, setName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [startDate, setStartDate] = React.useState<any>("");
  const [endDate, setEndDate] = React.useState<any>("");

  const showStatus = () => {
    setShowFields(!showFields);
  };

  const onSubmitHandler = (event: any) => {
    event.preventDefault();
    let currentExperience = props.userObject.pastExperience;
    let newExperience: Experience = {
      jobName: name,
      jobTitle: title,
      webiste: website,
      startYear: startDate,
      endYear: endDate,
    };
    currentExperience.push(newExperience);
    axios({
      method: "patch",
      url: `http://localhost:8000/users/${props.userObject._id}`,
      data: {
        data: {
          pastExperience: [...currentExperience],
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
    <div className="add-experience">
      {!showFields ? (
        <p className="hover-pointer">
          Add Past Experience{" "}
          <i className="bi bi-plus edit-pencil" onClick={showStatus}></i>
        </p>
      ) : (
        <form onSubmit={onSubmitHandler}>
          <input
            className="form-control"
            value={name}
            placeholder="Job Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            className="form-control"
            value={title}
            placeholder="Job Title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <input
            className="form-control"
            value={website}
            placeholder="Website"
            onChange={(event) => {
              setWebsite(event.target.value);
            }}
          />
          <label htmlFor="start-date">Start Date</label>
          <input
            className="form-control"
            type={"date"}
            value={startDate}
            id="start-date"
            onChange={(event: any) => {
              setStartDate(event.target.value);
              console.log(startDate);
            }}
          />
          <label htmlFor="start-date">End Date</label>
          <input
            className="form-control"
            type={"date"}
            value={endDate}
            id="end-date"
            onChange={(event: any) => {
              setEndDate(event.target.value);
            }}
          />
          <button type="submit" className="btn btn-success mb-4 w-full">
            Submit
          </button>
          <button
            type="button"
            onClick={showStatus}
            className="btn btn-danger w-full"
          >
            Cancle
          </button>
        </form>
      )}
    </div>
  );
}
