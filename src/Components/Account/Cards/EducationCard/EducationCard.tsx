import React from "react";

export default function EducationCard(props: any) {
  return (
    <div className="mt-5 mb-5 bg-default p-5 rounded-md education-card">
      <img className="school-image" src={props.schoolImage} />
      <h1 className="font-bold text-3xl mb-2 mt-2 school-name">
        {props.schoolName}
      </h1>
      <p className="text-xl font-thin mb-2 start-end">
        {props.start}/{props.end}
      </p>
      <button
        onClick={() => {
          window.location.href = props.schoolWebsite;
        }}
        className="btn btn-success"
      >
        Visit Website
      </button>
    </div>
  );
}
