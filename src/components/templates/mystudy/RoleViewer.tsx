import Text from "@/components/atoms/Text";
import RoleSetter from "@/components/organisms/recruitmentComponents/RoleSetter";
import { roleData } from "@/db/roles";
import { TRoleText } from "@/types/common";
import React, { useState } from "react";

type TRoleViewer = {
  type: "accepted_applies" | "sent_applies";
  desireRoles: TRoleText[];
  onChangeRole: (fixedRole: TRoleText) => void;
};

function RoleViewer(props: TRoleViewer) {
  console.log(props.desireRoles);
  console.log(props.type);

  return (
    <section className="p-4 flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <Text weight="bold">지원자 희망 역할</Text>
        <RoleSetter
          type="readOnly"
          intro="지원자가 희망하는 역할입니다."
          selectedRoles={props.desireRoles}
        />
      </div>
      {props.type === "accepted_applies" && (
        <div className="flex flex-col gap-2">
          <Text weight="bold">개설자 지정 역할</Text>
          <div className="relative w-64 ">
            <select
              onChange={(e) => {
                props.onChangeRole(e.target.value as TRoleText);
              }}
              className="h-12 w-full px-4 pr-10 border overflow-y-auto border-gray-300 rounded-[5px] text-sm font-bold appearance-none"
            >
              {roleData.map((role) => (
                <option key={role.title} value={role.role}>
                  {role.title}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default RoleViewer;
