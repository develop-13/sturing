import React, { useContext, useState } from "react";
import Icon from "@/components/atoms/Icon";
import Text from "./Text";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "../organisms/auth-components/UserStatusProvider";

type TCheckListItem = {
  userEmail?: string;
  isChecked?: boolean;
  text: string;
  studyId: string;
};

function CheckListItem(props: TCheckListItem) {
  const { isChecked = false, text, studyId, userEmail } = props;

  const { session }: UserStatusContextProps = useContext(UserStatusContext);

  const [checked, setChecked] = useState(isChecked);

  const handleCheck = async () => {
    const userEmailMine = session?.user.email;

    console.log(`나의 이메일=${userEmailMine}`);
    console.log(`다른 이메일=${userEmail}`);

    if (userEmail !== userEmailMine) {
      alert("다른 사용자의 출석여부는 체크할 수 없습니다.");
      return;
    }

    const value = !checked;
    setChecked(value);

    // PATCH 요청을 보내기 전에 값을 변경
    try {
      const response = await fetch(`/joiningStudy/${studyId}/api`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studyId,
          userEmail: userEmailMine,
          attendance: value, // true/false 값 (출석 여부)
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
  switch (checked) {
    case true:
      return (
        <div className="flex-1 flex justify-center">
          <div className="w-[25px] flex flex-col items-center justify-center gap-1 text-mainColor">
            <Icon type="CHECKED_ROUND" onClick={handleCheck} />
            <Text size="xs" weight="bold">
              {text}
            </Text>
          </div>
        </div>
      );

    case false:
      return (
        <div className="flex-1 flex justify-center">
          <div className="w-[25px] flex flex-col items-center justify-center gap-1 ">
            <Icon type="UNCHECKED_ROUND" onClick={handleCheck} />
            <Text size="xs" weight="bold">
              {text}
            </Text>
          </div>
        </div>
      );
  }
}

export default CheckListItem;
