import React from "react";
import InfoBox from "./InfoBox";
import Text from "@/components/atoms/Text";
import Divider from "@/components/atoms/Divider";
import UserInfoItem from "@/components/molecules/UserInfoItem";
import { PercentageBar } from "@/components/atoms/Progressbar";
import { TStudyMember } from "@/types/study";
import getTranslation from "@/utils/getTranslation";

const getPercent = (checkListItems: TStudyMember["checkList"] | undefined) => {
  if (!checkListItems || !checkListItems.length) {
    return 0;
  }
  let doneItems = 0;
  checkListItems.forEach((item) => {
    if (item.done) doneItems++;
  });
  return Math.floor(doneItems / checkListItems.length);
};

type TMemberProgressInfoBox = {
  teamMembers: {
    userEmail: string;
    applicantImgSrc: string;
    userName: string;
    role: string;
    checkList: TStudyMember["checkList"];
  }[];
};

function MemberProgressInfoBox(props: TMemberProgressInfoBox) {
  return (
    <InfoBox theme="white">
      <Text size="lg" weight="bold">
        팀원별 진척도
      </Text>
      <Divider type="row" />
      <div className="flex flex-col gap-3">
        {props.teamMembers?.map((teamMember) => (
          <UserInfoItem
            key={teamMember.userEmail}
            imgSrc={teamMember.applicantImgSrc}
            topText={
              teamMember.userName + " " + getTranslation(teamMember.role)
            }
            bottomText={
              <PercentageBar percentage={getPercent(teamMember.checkList)} />
            }
          />
        ))}
      </div>
    </InfoBox>
  );
}

export default React.memo(MemberProgressInfoBox);
