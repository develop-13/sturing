import CheckListItem from "@/components/atoms/CheckListItem";
import Divider from "@/components/atoms/Divider";
import { PercentageBar } from "@/components/atoms/Progressbar";
import Text from "@/components/atoms/Text";
import UserInfoItem from "@/components/molecules/UserInfoItem";
import AttendanceInfoBox from "@/components/organisms/infoBox/AttendanceInfoBox";
import InfoBox from "@/components/organisms/infoBox/InfoBox";
import { TCheckListItem, TStudyMember } from "@/types/study";
import getTranslation from "@/utils/getTranslation";
import React from "react";

export type TTeam = {
  teamMembers?: TStudyMember[];
  studyId: string;
};

const getPercent = (checkListItems: TCheckListItem[] | undefined) => {
  if (!checkListItems || !checkListItems.length) {
    return 30;
  }
  let doneItems = 0;
  checkListItems.forEach((item) => {
    if (item.done) doneItems++;
  });
  return Math.floor(checkListItems.length / doneItems);
};

function Team(props: TTeam) {
  console.log(props);

  return (
    <div className="px-4 py-5 flex flex-col gap-4">
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
      <AttendanceInfoBox
        studyId={props.studyId}
        teamMembers={props.teamMembers}
      />
    </div>
  );
}

export default Team;
