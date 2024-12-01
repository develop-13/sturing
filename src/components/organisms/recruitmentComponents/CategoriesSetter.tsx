import Text from "@/components/atoms/Text";
import React, { useState } from "react";
import { categories } from "@/db/categories";
import Button from "@/components/molecules/Button";
import { TCategory } from "@/types/common";

const CategoriesSetter = React.memo(
  ({
    selectedCategories,
    handleSetCategory,
  }: {
    selectedCategories: TCategory[];
    handleSetCategory: (selectedCategory: TCategory) => void;
  }) => {
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
              isActive={selectedCategories.includes(data)}
              onClick={() => {
                handleSetCategory(data);
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

// Display name을 설정
CategoriesSetter.displayName = "CategoriesSetter";

export default CategoriesSetter;
