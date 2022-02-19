import axios from "axios";
import * as React from "react";
import { useParams } from "react-router-dom";
import User from "../../../models/User.model";
import AddEducation from "../AddComponents/AddEducation/AddEducation";
import AddExperience from "../AddComponents/AddExperience/AddExperience";
import EducationCard from "../Cards/EducationCard/EducationCard";
import ExperienceCard from "../Cards/ExperienceCard/ExperienceCard";
import PostCard from "../Cards/PostCard/PostCard";
import Avatar from "../Sections/Avatar/Avatar";
import Socials from "../Socials/Socials";

export default function ViewAccount() {
  const { accountId } = useParams();

  const [account, setAccount] = React.useState<User>();
  const currentUser = localStorage.getItem("currentUser");

  React.useEffect(() => {
    if (accountId === "undefined") {
      return;
    }
    axios.get(`http://localhost:8000/users/${accountId}`).then((resData) => {
      setAccount(resData.data);
    });
    return () => {};
  }, []);

  return (
    <div className="account lg:pl-20 lg:pr-20 md:pl-10 md:pr-10 sm:pl-5 sm:pr-5">
      {account ? (
        <div className="grid lg:grid-cols-2  md:grid-cols-1 sm:grid-cols-1">
          <div className="content">
            <Avatar
              userObject={account}
              currentUser={currentUser}
              bannerImage={
                account.banner
                  ? account.banner
                  : "https://sankosf.com/wp-content/themes/gecko/assets/images/placeholder.png"
              }
              userPfp={
                account.profileImage
                  ? account.profileImage
                  : "https://sankosf.com/wp-content/themes/gecko/assets/images/placeholder.png"
              }
              edit={false}
            />
            <div className="education">
              <h1 className="font-bold text-4xl pt-5 pl-1">Education</h1>
              {account.education.length > 0 ? (
                account.education.map((education) => {
                  return (
                    <EducationCard
                      key={education.schoolName}
                      schoolName={education.schoolName}
                      schoolImage={education.schoolImage}
                      start={education.start}
                      end={education.end}
                      schoolWebsite={education.website}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </div>
            <div className="experience">
              <h1 className="font-bold text-4xl pt-5 pl-1">Past Experience</h1>
              {account.pastExperience.length > 0 ? (
                account.pastExperience.map((experience) => {
                  return (
                    <ExperienceCard
                      key={experience.jobName}
                      jobName={experience.jobName}
                      jobImage={experience.jobImage}
                      jobTitle={experience.jobTitle}
                      startYear={experience.startYear}
                      endYear={experience.endYear}
                      website={experience.webiste}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </div>
            <div className="posts">
              <div className="posts-header">
                <h1 className="text-3xl font-bold">Posts</h1>
              </div>
              <div className="posts-list">
                {account.posts.length > 0 ? (
                  account.posts.map((post) => {
                    return (
                      <PostCard
                        postTitle={post.title}
                        postDesc={post.description}
                        attachments={post.attachments}
                        key={post.title}
                      />
                    );
                  })
                ) : (
                  <p className="no-posts">No Posts Yet...</p>
                )}
              </div>
            </div>
          </div>
          <Socials currentUser={currentUser} userObject={account} />
        </div>
      ) : (
        <div
          className="loader
  "
        ></div>
      )}
    </div>
  );
}
