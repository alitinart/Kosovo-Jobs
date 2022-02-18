import axios from "axios";
import * as React from "react";
import Education from "../../../../models/Education.model";

export default function AddEducation(props: any) {
  const [showFields, setShowFields] = React.useState(false);

  const [name, setName] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [startDate, setStartDate] = React.useState<any>("");
  const [endDate, setEndDate] = React.useState<any>("");

  const showStatus = () => {
    setShowFields(!showFields);
  };

  const onSubmitHandler = (event: any) => {
    event.preventDefault();
    let currentEducation = props.userObject.education;
    let newEducation: Education = {
      schoolName: name,
      website: website,
      start: startDate,
      end: endDate,
    };
    currentEducation.push(newEducation);
    axios({
      method: "patch",
      url: `http://localhost:8000/users/${props.userObject._id}`,
      data: {
        data: {
          education: [...currentEducation],
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
    <div className="add-education mt-3">
      {!showFields ? (
        <p className="hover-pointer">
          Add Education{" "}
          <i className="bi bi-plus edit-pencil" onClick={showStatus}></i>
        </p>
      ) : (
        <form onSubmit={onSubmitHandler} className="form">
          <input
            className="form-control"
            value={name}
            placeholder="School Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            className="form-control"
            value={website}
            placeholder="School Website"
            onChange={(event) => {
              setWebsite(event.target.value);
            }}
          />
          <label htmlFor="start-date">Start Date</label>
          <input
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
