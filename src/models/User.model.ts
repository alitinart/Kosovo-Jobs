import Education from "./Education.model";
import Experience from "./Experience.model";
import Post from "./Post.model";

export default interface User {
  email: string;
  fullname: string;
  password: string;
  profileImage: string;
  banner: string;
  bio: string;
  profession: string;
  education: Education[];
  posts: Post[];
  pastExperience: Experience[];
  _id: string;
}
