import Post from "./Post.model";

export default interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profileImage: string;
  banner: string;
  bio: string;
  profession: string;
  posts: Post[];
  _id: string;
}
