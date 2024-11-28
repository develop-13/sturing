import React, { useContext, useState } from "react";
import InfoBox from "./InfoBox";
import Text from "@/components/atoms/Text";
import Divider from "@/components/atoms/Divider";
import CheckItem from "@/components/molecules/CheckItem/CheckItem";
import { TStudyMember } from "@/types/study";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "../auth-components/UserStatusProvider";

type TAttendanceInfoBox = {
  teamMembers?: TStudyMember[];
  onAttendanceChange: (updatedTeamMembers: any) => void;
  studyId: string;
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

function AttendanceInfoBox(props: TAttendanceInfoBox) {
  const { teamMembers } = props;

  const { session }: UserStatusContextProps = useContext(UserStatusContext);

  const handleCheck = (userEmail: string, checked?: boolean) => async () => {
    // 각각의 checkListItem에 handleCheck를 붙인다.
    const userEmailMine = session?.user.email;

    console.log(`list userEmail=${userEmail}`);
    console.log(`userEmailMine=${userEmailMine}`);

    if (userEmail !== userEmailMine) {
      alert("다른 사용자의 출석여부는 체크할 수 없습니다.");
      return;
    }

    const updatedChecked = !checked;
    const updatedTeamMembers = teamMembers?.map((teamMember) => {
      if (teamMember.userEmail == userEmailMine) {
        teamMember.attendance = updatedChecked;
      }
      return teamMember;
    });

    // setTeamMembers(updatedTeamMembers);
    props.onAttendanceChange(updatedTeamMembers);
    // PATCH 요청을 보내기 전에 값을 변경
    try {
      const response = await fetch(`/joiningStudy/${props.studyId}/api`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studyId: props.studyId,
          userEmail: userEmailMine,
          attendance: updatedChecked, // true/false 값 (출석 여부)
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update attitude.");
      }

      const data = await response.json();
      console.log("Attitude updated:", data);
    } catch (error) {
      console.error("Error updating attitude:", error);
    }
  };

  return (
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
        {props.teamMembers?.map((teamMember) => (
          <CheckItem
            type="col"
            isChecked={teamMember.attendance}
            text={teamMember.userName}
            key={teamMember.userEmail}
            handleCheck={handleCheck(
              teamMember.userEmail,
              teamMember.attendance
            )}
          />
        ))}
      </div>
    </InfoBox>
  );
}

export default AttendanceInfoBox;
