import { useReducer, useState } from "react";
import Text from "../../atoms/Text";
import { TabButtonGroup } from "../../organisms/ButtonGroup";
import getTranslation from "@/utils/getTranslation";
import { TCategory, TFilterDatas } from "@/types/common";
import CategorySetter from "@/components/organisms/CategorySetter";
import NumberSetter from "@/components/organisms/NumberSetter";
import LocationSetter from "@/components/organisms/LocationSetter";
import {
  FilterReducer,
  initialState,
  createDispatchFuncs,
  TDispatchFuncs,
  TFilterState,
} from "@/reducers/filterReducer";
import DurationSetter from "@/components/organisms/DurationSetter";
import LevelSetter from "@/components/organisms/LevelSetter";
import RoleSetter from "@/components/organisms/RoleSetter";
import Box from "@/components/atoms/Box";
import Icon from "@/components/atoms/Icon";
// 여기에 reducer 필요함

const filterModalTemplates = (
  state: TFilterState,
  filterDatas: TFilterDatas,
  DispatchFuncs: TDispatchFuncs
) => ({
  categories: (
    <CategorySetter
      categories={filterDatas.categories}
      selectedCategories={state.selectedCategories}
      addCategory={DispatchFuncs.setCategory}
      cancelCategory={DispatchFuncs.cancelCategory}
    />
  ),
  // 예를 들어, locations와 같은 다른 필터가 있다면 추가
  membernum: (
    <NumberSetter
      memberNum={state.memberNum}
      decreaseFunc={DispatchFuncs.decreaseMemberNum}
      increaseFunc={DispatchFuncs.increaseMemberNum}
    />
  ),
  locations: (
    <LocationSetter
      selectedLocations={state.locations}
      addLocation={DispatchFuncs.addLocation}
      deleteLocation={DispatchFuncs.deleteLocation}
    />
  ), // 실제 컴포넌트를 여기에 추가
  duration: (
    <DurationSetter duration={state.duration} setDate={DispatchFuncs.setDate} />
  ),
  levels: (
    <LevelSetter level={state.levels} setLevel={DispatchFuncs.setLevel} />
  ),
  roles: (
    <RoleSetter
      selectedRoles={state.roles}
      addRole={DispatchFuncs.setRole}
      cancelRole={DispatchFuncs.cancelRole}
    />
  ),
});

function FilterModal({ filterDatas }: { filterDatas: TFilterDatas }) {
  const [state, dispatch] = useReducer(FilterReducer, initialState);

  const [currentTab, setCurrentTab] = useState(0); // 탭
  const currentKey = Object.keys(filterDatas)[currentTab] as keyof TFilterDatas;

  const DispatchFuncs = createDispatchFuncs(dispatch);

  const templateComponent = filterModalTemplates(
    state,
    filterDatas,
    DispatchFuncs
  )[currentKey];

  return (
    <div className="w-full h-full bg-white border border-gray-300 absolute top-0 left-0 z-50 flex flex-col gap-4 px-4 py-6 rounded-[15px]">
      <Text size="lg" weight="bold">
        필터
      </Text>
      <TabButtonGroup
        buttonGroupData={Object.keys(filterDatas).map((option) =>
          getTranslation(option)
        )}
        selectedOptionIdx={currentTab}
        onClick={(selectedOptionIdx: number) => {
          setCurrentTab(selectedOptionIdx);
        }}
      />
      {templateComponent}
      <div className="flex w-[92%] gap-2 h-[50px] mx-auto text-gray-600 absolute bottom-3 ">
        <Box
          props={{
            theme: "ordinary",
            shape: "full",
            onClick: () => {
              console.log("reset button clicked");
              DispatchFuncs.resetFilterData();
            },
          }}
        >
          <Icon type="RESET" />
          <Text weight="bold">초기화</Text>
        </Box>
        <Box
          props={{
            theme: "primary",
            shape: "full",
            extraCss: "text-white ",
          }}
        >
          <Text weight="bold">결과보기</Text>
        </Box>
      </div>
    </div>
  );
}

export default FilterModal;

// 여기서 getStaticProps로 서버로부터 미리 받아옴? 하지만 getStaticProps는 클라이언트 컴포넌트에서는
// 안되는데 그 작업은 나중에 조정하자.
