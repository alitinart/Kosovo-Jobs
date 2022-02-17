import React from "react";

export default function EducationCard(props: any) {
  return (
    <div className="education-card">
      <img className="school-image" src={props.schoolImage} />
      <h1 className="school-name">{props.schoolName}</h1>
      <p className="start-end">
        {props.start}/{props.end}
      </p>
      <button onClick={(window.location.href = props.schoolWebsite)}>
        Visit Website
      </button>
    </div>
  );
}
