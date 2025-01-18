import { TRoleItem, roleData } from "@/db/roles";
import { CheckBarButton } from "../molecules/IconLabelButton";
import { TDispatchFuncs, TFilterState } from "@/states/filterReducer";

function RoleSetter({
  selectedRoles,
  addRole,
  cancelRole,
}: {
  selectedRoles: TFilterState["roles"];
  addRole: TDispatchFuncs["setRole"];
  cancelRole: TDispatchFuncs["cancelRole"];
}) {
  const getIsSelected = (role: TRoleItem["role"]) => {
    return !!selectedRoles.find((selectedRole) => role === selectedRole);
  };

  return (
    <div className="grid grid-cols-2 gap-[15px] w-full">
      {roleData.map((data) => {
        let isSelected = getIsSelected(data.role);

        return (
          <CheckBarButton
            isActive={isSelected}
            onClick={() => {
              if (isSelected) {
                cancelRole(data.role);
              } else {
                addRole(data.role);
              }
            }}
            type="checkOnClick"
            key={data.role}
            theme="ordinary"
            className="!p-3 "
          >
            <div className="flex items-center gap-[7px]">
              <span className="text-[12px] font-bold"> {data.title}</span>
              <span className="text-[9px] text-gray-1000 font-bold">
                {data.text}
              </span>
            </div>
          </CheckBarButton>
        );
      })}
    </div>
  );
}

export default RoleSetter;
