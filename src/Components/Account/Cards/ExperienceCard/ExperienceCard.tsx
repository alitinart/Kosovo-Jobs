import React from "react";

export default function ExperienceCard(props: any) {
  return (
    <div className="mt-5 mb-5 bg-default p-5 rounded-md  experience-card">
      <img className="job-image" src={props.jobImage} />
      <h1 className="font-bold text-3xl job-name">{props.jobName}</h1>
      <p className="mt-2 font-semibold text-xl job-title">{props.jobTitle}</p>
      <p className="mt-2 font-thin text-lg fontstart-end">
        {props.startYear} / {props.endYear}
      </p>
      <button
        className="mt-3 btn btn-success"
        onClick={() => {
          window.location.href = props.schoolWebsite;
        }}
      >
        Visit Website
      </button>
    </div>
  );
}
