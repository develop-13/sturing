import { TIconData } from "@/components/atoms/Icon";

export const iconAdapter = (text: string): TIconData["type"] => {
  if (text.toUpperCase() as TIconData["type"]) {
    return text.toUpperCase() as TIconData["type"];
  } else {
    return "ADD";
  }
};

export const getBlobStringAdapter = (imgSrc: Blob) => {
  return URL.createObjectURL(imgSrc);
};
