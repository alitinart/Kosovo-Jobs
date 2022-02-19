import axios from "axios";
import React, { useEffect, useState } from "react";
import User from "../../models/User.model";

import "./Account.css";
import AddEducation from "./AddComponents/AddEducation/AddEducation";
import AddExperience from "./AddComponents/AddExperience/AddExperience";
import AddPost from "./AddComponents/AddPost/AddPost";
import EducationCard from "./Cards/EducationCard/EducationCard";
import ExperienceCard from "./Cards/ExperienceCard/ExperienceCard";
import PostCard from "./Cards/PostCard/PostCard";
import Avatar from "./Sections/Avatar/Avatar";
import Socials from "./Socials/Socials";

export default function Account(props: any) {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser")
  );

  const [userObject, setUserObject] = useState<User>();
  const [bannerImage, setBannerImage] = useState("");
  const [userPfp, setUserPfp] = useState("");

  const [showPostFields, setShowPostFields] = useState(false);

  const updateUser = () => {
    axios
      .get("http://localhost:8000/users/find", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("currentUser")}`,
        }, //https://sankosf.com/wp-content/themes/gecko/assets/images/placeholder.png
      })
      .then((resData: any) => {
        if (resData.data._doc) {
          if (resData.data._doc.banner) {
            setBannerImage(resData.data._doc.banner);
          } else {
            setBannerImage(
              "https://sankosf.com/wp-content/themes/gecko/assets/images/placeholder.png"
            );
          }

          if (resData.data._doc.profileImage) {
            setUserPfp(resData.data._doc.profileImage);
          } else {
            setUserPfp(
              "https://sankosf.com/wp-content/themes/gecko/assets/images/placeholder.png"
            );
          }

          setUserObject(resData.data._doc);
        } else {
          if (resData.data.banner) {
            setBannerImage(resData.data.banner);
          } else {
            setBannerImage(
              "https://sankosf.com/wp-content/themes/gecko/assets/images/placeholder.png"
            );
          }

          if (resData.data.profileImage) {
            setUserPfp(resData.data.profileImage);
          } else {
            setUserPfp(
              "https://sankosf.com/wp-content/themes/gecko/assets/images/placeholder.png"
            );
          }

          setUserObject(resData.data);
        }
      });
  };

  useEffect(() => {
    updateUser();
    return () => {};
  }, []);

  return (
    <div className="account lg:pl-20 lg:pr-20 md:pl-10 md:pr-10 sm:pl-5 sm:pr-5">
      {userObject ? (
        <div className="grid lg:grid-cols-2  md:grid-cols-1 sm:grid-cols-1">
          <div className="content">
            <Avatar
              userObject={userObject}
              currentUser={currentUser}
              edit={true}
              updateUser={() => {
                updateUser();
              }}
              uploadType={(text: string) => {
                props.uploadType(text);
              }}
              userPfp={userPfp}
              bannerImage={bannerImage}
            />
            <div className="education">
              <h1 className="font-bold text-4xl pt-5 pl-1">Education</h1>
              {userObject.education.length > 0 ? (
                userObject.education.map((education) => {
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
              <AddEducation currentUser={currentUser} userObject={userObject} />
            </div>
            <div className="experience">
              <h1 className="font-bold text-4xl pt-5 pl-1">Past Experience</h1>
              {userObject.pastExperience.length > 0 ? (
                userObject.pastExperience.map((experience) => {
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
              <AddExperience
                currentUser={currentUser}
                userObject={userObject}
              />
            </div>
            <div className="posts">
              <div className="posts-header">
                <h1 className="text-3xl font-bold">Posts</h1>
                {!showPostFields ? (
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setShowPostFields(!showPostFields);
                    }}
                  >
                    Create Post
                  </button>
                ) : (
                  <></>
                )}
              </div>
              <div className="posts-list">
                <AddPost
                  changeStatus={() => {
                    setShowPostFields(!showPostFields);
                  }}
                  currentUser={currentUser}
                  userObject={userObject}
                  showFields={showPostFields}
                />
                {userObject.posts.length > 0 ? (
                  userObject.posts.map((post) => {
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
          <Socials currentUser={currentUser} userObject={userObject} />
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
