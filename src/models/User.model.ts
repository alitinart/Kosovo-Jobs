import Education from "./Education.model";
import Experience from "./Experience.model";
import Post from "./Post.model";

export default interface User {
  username: string;
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
  accountType: string;
  socials: {
    name: string;
    url: string;
    socialImage: string;
    linked: boolean;
  }[];
  _id: string;
}
