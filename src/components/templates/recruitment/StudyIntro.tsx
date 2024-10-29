import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import Button from "@/components/molecules/Button";
import { ItemButtonGroup } from "@/components/organisms/ButtonGroup";
import CategoriesSetter from "@/components/organisms/recruitmentComponents/CategoriesSetter";
import TitleSetter from "@/components/organisms/recruitmentComponents/TitleSetter";
import { HandleStateChange } from "@/components/pages/RecruitmentPage";
import { TCategory } from "@/types/common";
import { TStudyRecruitment } from "@/types/study";
import { useCallback, useRef } from "react";

function StudyIntro({
  state,
  handleStateChange,
}: {
  state: TStudyRecruitment;
  handleStateChange: HandleStateChange<TStudyRecruitment>;
}) {
  const handleSetImgSrc = useCallback(
    (inputContent: string) => {
      handleStateChange("imgSrc", inputContent);
    },
    [state.imgSrc]
  );

  const handleSetCategory = useCallback(
    (selectedCategory: TCategory) => {
      const isSelected = state.categories.includes(selectedCategory);
      const updatedCategories = isSelected
        ? state.categories.filter((category) => category !== selectedCategory) // 이미 있으면 제거
        : [...state.categories, selectedCategory]; // 없으면 추가

      handleStateChange("categories", updatedCategories);

      return isSelected ? "unSelected" : "selected";
    },
    [state.categories]
  );

  return (
    <section className="py-4 flex flex-col gap-5">
      <Text size="xl" weight="bold">
        스터디에 대해 소개해 주세요
      </Text>
      <div className="flex flex-col gap-3 thumbnail">
        <Text size="sm" weight="bold">
          스터디 대표 사진
        </Text>
        <div className="w-[70px] h-[70px] rounded-[5px] border border-gray-300 flex items-center justify-center">
          <Icon type="CAMERA" height={30} width={30} />
        </div>
      </div>
      {/*  */}
      <TitleSetter handleSetImgSrc={handleSetImgSrc} />
      <CategoriesSetter handleSetCategory={handleSetCategory} />
      <div className="flex flex-col gap-3 intro">
        <label htmlFor="intro">
          <Text size="sm" weight="bold">
            자기소개
          </Text>
        </label>
        <textarea
          id="intro"
          placeholder="소개글을 입력해 주세요 (최소 20자 필수)"
          cols={30}
          rows={10}
          className="px-4 py-3 border border-gray-300 resize-none outline-none rounded-[5px] placeholder: text-[14px] placeholder:font-medium placeholder:text-gray-600"
        ></textarea>
      </div>
      {/*  */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <Button theme="ordinary" shape="tag">
            <Text size="xs" weight="bold" color="gray-600">
              온라인
            </Text>
          </Button>
          <Button theme="ordinary" shape="tag">
            <Text size="xs" weight="bold" color="gray-600">
              오프라인
            </Text>
          </Button>
        </div>
        <div className="flex items-center p-3 gap-1 w-full rounded-[5px] border border-gray-300">
          <Icon type="LOCATION" />
          <Text size="sm" weight="bold" color="gray-600">
            희망 스터디 위치를 등록해 주세요
          </Text>
        </div>
        <Button theme="ordinary" shape="border-dot">
          <Icon type="ADD" />
          <Text size="sm" weight="bold" color="gray-600">
            추가하기
          </Text>
        </Button>
      </div>
    </section>
  );
}
// 카테고리 부분 useContext로 전역에서 뿌려주어서 중복을 제거해볼까?
export default StudyIntro;
