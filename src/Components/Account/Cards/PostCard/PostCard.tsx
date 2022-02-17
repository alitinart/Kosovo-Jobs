import React from "react";

export default function PostCard(props: any) {
  return (
    <div className="post-card">
      <h1 className="post-title">{props.postTitle}</h1>
      <p className="post-desc">{props.postDesc}</p>
      <ul className="attachments">
        {props.attachments.map((attachment: File) => {
          <li className="attachment">{attachment.name}</li>;
        })}
      </ul>
    </div>
  );
}
