import Text from "@/components/atoms/Text";
import React, { useState } from "react";
import { categories } from "@/db/categories";
import Button from "@/components/molecules/Button";
import { TCategory } from "@/types/common";

const CategoriesSetter = React.memo(
  ({
    handleSetCategory,
  }: {
    handleSetCategory: (
      selectedCategory: TCategory
    ) => "selected" | "unSelected";
  }) => {
    const [selectedIdxes, setSelectedIdxes] = useState<number[]>([]);

    const onClickHandler = (idx: number) => {
      const res = handleSetCategory(categories[idx]);
      if (res === "selected") {
        setSelectedIdxes([...selectedIdxes, idx]);
      } else {
        const updatedSelectedIdxes = selectedIdxes.filter((i) => i !== idx);
        setSelectedIdxes(updatedSelectedIdxes);
      }
    };

    return (
      <div className="flex flex-col gap-3 categories">
        <Text size="sm" weight="bold">
          카테고리
        </Text>
        <div className="flex gap-2 flex-wrap text-gray-600">
          {categories.map((data, idx) => (
            <Button
              theme="ordinary"
              shape="tag"
              key={data}
              isActive={selectedIdxes.includes(idx)}
              onClick={() => {
                onClickHandler(idx);
              }}
            >
              <Text size="xs" weight="bold">
                {data}
              </Text>
            </Button>
          ))}
        </div>
      </div>
    );
  }
);

export default CategoriesSetter;
