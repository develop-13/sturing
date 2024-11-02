import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import CategoriesSetter from "@/components/organisms/recruitmentComponents/CategoriesSetter";
import ImageSetter from "@/components/organisms/recruitmentComponents/ImageSetter";
import LocationShowSetter from "@/components/organisms/recruitmentComponents/LocationShowSetter";
import TextSetter from "@/components/organisms/recruitmentComponents/TextSetter";
import TitleSetter from "@/components/organisms/recruitmentComponents/TitleSetter";
import TypeSetter from "@/components/organisms/recruitmentComponents/TypeSetter";
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
  const handleSetImage = useCallback(
    (imageSrc: Blob) => {
      handleStateChange("imgSrc", imageSrc);
    },
    [state.imgSrc]
  );

  const handleSetTitle = useCallback(
    (inputContent: string) => {
      handleStateChange("title", inputContent);
    },
    [state.title]
  );

  const handleSetCategory = useCallback(
    (selectedCategory: TCategory) => {
      const isSelected = state.categories.includes(selectedCategory);
      const updatedCategories = isSelected
        ? state.categories.filter((category) => category !== selectedCategory) // 이미 있으면 제거
        : [...state.categories, selectedCategory]; // 없으면 추가

      handleStateChange("categories", updatedCategories);
    },
    [state.categories]
  );

  const handleSetIntrouduceText = useCallback(
    (text: string) => {
      handleStateChange("description", text);
    },
    [state.description]
  );

  const handleSetLocation = useCallback(
    (text: string) => {
      handleStateChange("location", text);
    },
    [state.location]
  );

  const handleSetType = useCallback(
    (text: "online" | "offline") => {
      handleStateChange("type", text);
    },
    [state.location]
  );

  return (
    <section className="py-4 flex flex-col gap-5">
      <Text size="xl" weight="bold">
        스터디에 대해 소개해 주세요
      </Text>
      <ImageSetter handleSetImage={handleSetImage} imgSrc={state.imgSrc} />
      {/*  */}
      <TitleSetter title={state.title} handleSetTitle={handleSetTitle} />
      <CategoriesSetter
        selectedCategories={state.categories}
        handleSetCategory={handleSetCategory}
      />
      <TextSetter
        description={state.description}
        handleSetIntrouduceText={handleSetIntrouduceText}
      />
      {/*  */}
      <div className="flex flex-col gap-3">
        <TypeSetter handleSetType={handleSetType} type={state.type} />
        <LocationShowSetter
          currentLocation={state.location}
          handleSetLocation={handleSetLocation}
        />
      </div>
    </section>
  );
}
// 카테고리 부분 useContext로 전역에서 뿌려주어서 중복을 제거해볼까?
export default StudyIntro;
