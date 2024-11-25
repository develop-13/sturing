import React from "react";
import Image from "../atoms/Image";

type TUserInfoItem = {
  imgSrc: string;
  topText: React.ReactNode;
  bottomText: React.ReactNode;
};

const UserInfoItem = (props: TUserInfoItem) => {
  return (
    <div className="flex items-center">
      <Image
        width={40}
        height={40}
        src={props.imgSrc}
        className="w-10 h-10 rounded-full mr-3"
      />
      <div className="flex flex-col w-full gap-1">
        <div className="flex items-center">{props.topText}</div>
        {props.bottomText}
      </div>
    </div>
  );
};

export default UserInfoItem;
