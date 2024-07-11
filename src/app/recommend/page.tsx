"use client";
import InputField from "@/components/molecules/InputField";
import { useState } from "react";

function RecommendPage() {
  const [value, setValue] = useState("스터디");

  return (
    <InputField
      datas={{
        type: "EMAIL_EDITABLE",
        value: value,
        onChange: (value: string) => setValue(value),
      }}
    />
  );
}

export default RecommendPage;
