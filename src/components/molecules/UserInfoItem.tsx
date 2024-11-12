import React from "react";
import Image from "../atoms/Image";

// type TUserInfoItem = {
//   name: string;
//   role: string;
//   isCreator: boolean;
//   profileImage: string;
// };

// const UserInfoItem = ({
//   name,
//   role,
//   isCreator,
//   profileImage,
// }: TUserInfoItem) => {
//   return (
//     <div className="flex items-center">
//       <img
//         src={profileImage}
//         alt={`${name} profile`}
//         className="w-10 h-10 rounded-full mr-3"
//       />
//       <div className="flex flex-col">
//         <div className="flex items-center">
//           <span className="font-bold">{name}</span>
//           {isCreator && <span className="text-blue-500 ml-1"> · 개설자</span>}
//         </div>
//         <div className="text-gray-500">{role}</div>
//       </div>
//     </div>
//   );
// };

// export default UserInfoItem;

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
      <div className="flex flex-col">
        <div className="flex items-center">{props.topText}</div>
        {props.bottomText}
      </div>
    </div>
  );
};

export default UserInfoItem;
