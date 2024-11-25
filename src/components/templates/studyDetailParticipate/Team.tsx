import CheckListItem from "@/components/atoms/CheckListItem";
import Divider from "@/components/atoms/Divider";
import { PercentageBar } from "@/components/atoms/Progressbar";
import Text from "@/components/atoms/Text";
import UserInfoItem from "@/components/molecules/UserInfoItem";
import InfoBox from "@/components/organisms/infoBox/InfoBox";
import { TCheckListItem, TStudyMember } from "@/types/study";
import getTranslation from "@/utils/getTranslation";
import React from "react";

type TTeam = {
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

const getAttendance = (teamMembers: TStudyMember[] | undefined) => {
  let present = 0;
  if (!teamMembers || !teamMembers.length) {
    return present + "/" + 0;
  }
  teamMembers.forEach((teamMember) => {
    if (teamMember.attendance) present++;
  });
  return present + "/" + teamMembers.length;
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
      <InfoBox theme="white">
        <div className="flex gap-2 items-center">
          <Text size="lg" weight="bold">
            출석체크 현황
          </Text>
          <Text weight="bold" color="main">
            {getAttendance(props.teamMembers)}
          </Text>
        </div>
        <Divider type="row" />
        <div className="flex">
          <CheckListItem
            studyId={props.studyId}
            isChecked={false}
            text="예시"
            userEmail="예시"
          />
          {props.teamMembers?.map((teamMember) => (
            <CheckListItem
              studyId={props.studyId}
              isChecked={teamMember.attendance}
              text={teamMember.userName}
              key={teamMember.userEmail}
              userEmail={teamMember.userEmail}
            />
          ))}
        </div>
      </InfoBox>
    </div>
  );
}

export default Team;
