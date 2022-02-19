import * as React from "react";
import SocialCardModel from "../../../models/SocialCard.model";
import SocialCard from "./SocialCard/SocialCard";

import "./Socials.css";

export default function Socials(props: any) {
  const socialCards: SocialCardModel[] = props.userObject.socials;

  return (
    <div className="socials bg-default">
      <h1 className="font-bold text-5xl mb-10 mt-5 text-center">Socials</h1>
      <div className="socials-grid grid md:grid-cols-2 sm:grid-cols-1">
        {socialCards.map((socialCard, index) => {
          if (socialCard.linked) {
            return (
              <SocialCard
                currentUser={props.currentUser}
                userObject={props.userObject}
                linked={true}
                url={socialCard.url}
                name={socialCard.name}
                key={socialCard.name}
                socialImage={socialCard.socialImage}
              />
            );
          } else {
            return (
              <SocialCard
                currentUser={props.currentUser}
                userObject={props.userObject}
                name={socialCard.name}
                key={socialCard.name}
                socialImage={socialCard.socialImage}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
