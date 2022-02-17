import React from "react";

export default function ExperienceCard(props: any) {
  return (
    <div className="experience-card">
      <img className="job-image" src={props.jobImage} />
      <h1 className="job-name">{props.jobName}</h1>
      <p className="job-title">{props.jobTitle}</p>
      <p className="start-end">
        {props.startYear}/{props.endYear}
      </p>
      <button onClick={(window.location.href = props.schoolWebsite)}>
        Visit Website
      </button>
    </div>
  );
}
