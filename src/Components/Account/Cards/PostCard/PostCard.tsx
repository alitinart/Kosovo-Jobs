import React from "react";

export default function PostCard(props: any) {
  return (
    <div className="post-card mt-3">
      <h1 className="font-bold text-3xl mb-2 post-title">{props.postTitle}</h1>
      <p className="post-desc">{props.postDesc}</p>
      {/* <ul className="attachments">
        {props.attachments.map((attachment: File) => {
          <li className="attachment">{attachment.name}</li>;
        })}
      </ul> */}
    </div>
  );
}
