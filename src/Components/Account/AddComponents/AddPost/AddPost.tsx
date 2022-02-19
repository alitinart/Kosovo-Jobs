import axios from "axios";
import * as React from "react";
import Post from "../../../../models/Post.model";

export default function AddPost(props: any) {
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const onSubmitHandler = (event: any) => {
    event.preventDefault();
    let currentPosts = props.userObject.posts;

    const newPost: Post = {
      title: title,
      description: desc,
    };

    currentPosts.push(newPost);
    axios({
      method: "patch",
      url: `http://localhost:8000/users/${props.userObject._id}`,
      data: {
        data: {
          posts: [...currentPosts],
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
    <div className="add-post">
      {props.showFields ? (
        <div>
          <h1 className="font-bold">Create Post</h1>
          <form onSubmit={onSubmitHandler} className="mb-5">
            <input
              className="form-control"
              placeholder="Title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <textarea
              className="form-control"
              placeholder="Description"
              onChange={(event) => {
                setDesc(event.target.value);
              }}
            ></textarea>
            {/* <input className="form-control" type={"file"} /> */}
            <button type="submit" className="btn btn-success mb-4 w-full">
              Submit
            </button>
            <button
              type="button"
              onClick={props.changeStatus}
              className="btn btn-danger w-full"
            >
              Cancle
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
