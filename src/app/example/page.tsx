"use client";
import RoleSetter from "@/components/organisms/RoleSetter";
import RoleSetterS from "@/components/organisms/recruitmentComponents/RoleSetter";
import { TRoleText } from "@/types/common";
import React from "react";

function page() {
  return (
    <div>
      <RoleSetterS
        intro=""
        handleSetRole={() => {}}
        selectedRoles={["attendance_checker", "notification_leader"]}
      />
      <div className="h-5"> divider</div>
      <RoleSetter
        cancelRole={() => {}}
        addRole={() => {}}
        selectedRoles={new Set(["team_leader" as TRoleText])}
      />
    </div>
  );
}

export default page;
