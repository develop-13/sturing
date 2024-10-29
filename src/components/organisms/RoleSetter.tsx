import { roleData } from "@/db/roles";
import { CheckBarButton } from "../molecules/IconLabelButton";
import { TDispatchFuncs, TFilterState } from "@/reducers/filterReducer";

function RoleSetter({
  selectedRoles,
  addRole,
  cancelRole,
}: {
  selectedRoles: TFilterState["roles"];
  addRole: TDispatchFuncs["setRole"];
  cancelRole: TDispatchFuncs["cancelRole"];
}) {
  return (
    <div className="grid grid-cols-2 gap-[15px] w-full">
      {roleData.map((data) => (
        <CheckBarButton
          isActive={selectedRoles.has(data.role)}
          onClick={() => {
            if (selectedRoles.has(data.role)) {
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
      ))}
    </div>
  );
}

export default RoleSetter;
