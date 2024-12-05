import React from "react";
import InfoBox from "./InfoBox";
import Text from "@/components/atoms/Text";
import Divider from "@/components/atoms/Divider";
import UserInfoItem from "@/components/molecules/UserInfoItem";
import { PercentageBar } from "@/components/atoms/Progressbar";
import { TJoiningStudy_Client, TStudyMember } from "@/types/study";
import getTranslation from "@/utils/getTranslation";

const getPercent = (checkListItems: TStudyMember["checkList"]) => {
  console.log(checkListItems);

  if (!checkListItems.length) {
    return 0;
  }
  let finished = 0;
  checkListItems.forEach((item) => {
    if (item.done) finished++;
  });
  console.log(`finished=${finished}`);
  return (finished / checkListItems.length) * 100;
};

type TMemberProgressInfoBox = {
  teamMembers: TJoiningStudy_Client["currentMembers"];
  memberCheckLists: TJoiningStudy_Client["memberCheckLists"];
};

function MemberProgressInfoBox(props: TMemberProgressInfoBox) {
  console.log("memberCheckLists");
  console.log(props.memberCheckLists);

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
              <PercentageBar
                // 각 멤버의 체크리스트
                percentage={getPercent(
                  props.memberCheckLists[teamMember.userEmail]
                )}
              />
            }
          />
        ))}
      </div>
    </InfoBox>
  );
}

export default React.memo(MemberProgressInfoBox);
