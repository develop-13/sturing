"use client";

import { useRouter } from "next/navigation";
import Icon from "../atoms/Icon";
import ButtonLabel from "../molecules/IconLabelButton";
import IconLabelButton from "../molecules/IconLabelButton";

export default function StudyCategory() {
  const router = useRouter();

  const onClickHandler = () => {
    // router.push("search/result");
  };

  return (
    <>
      <div className="relative overflow-x-hidden">
        <ul className="flex gap-2 overflow-x-hidden list-none px-2">
          <IconLabelButton
            datas={{
              usage: "round",
              text: "뉴비",
              icon: <Icon type="DESIGN" />,
              onClick: onClickHandler,
            }}
          />
          <ButtonLabel
            datas={{
              text: "디자인",
              usage: "round",
              onClick: onClickHandler,
              icon: <Icon type="DESIGN" />,
            }}
          />
          <ButtonLabel
            datas={{
              text: "개발·테크",
              usage: "round",
              onClick: onClickHandler,
              icon: <Icon type="TECH" />,
            }}
          />
          <ButtonLabel
            datas={{
              text: "마케팅",
              usage: "round",
              onClick: onClickHandler,
              icon: <Icon type="MARKETING" />,
            }}
          />
          <ButtonLabel
            datas={{
              text: "비즈니스",
              usage: "round",
              onClick: onClickHandler,
              icon: <Icon type="BUSINESS" />,
            }}
          />
          <ButtonLabel
            datas={{
              text: "경제",
              usage: "round",
              onClick: onClickHandler,
              icon: <Icon type="ECONOMY" />,
            }}
          />
          <ButtonLabel
            datas={{
              text: "외국어",
              usage: "round",

              onClick: onClickHandler,
              icon: <Icon type="LANGUAGE" />,
            }}
          />
          <ButtonLabel
            datas={{
              text: "자격증",
              usage: "round",
              onClick: onClickHandler,
              icon: <Icon type="CERTIFICATION" />,
            }}
          />
          <ButtonLabel
            datas={{
              text: "자기계발",
              usage: "round",
              onClick: onClickHandler,
              icon: <Icon type="SELFDEVELOP" />,
            }}
          />
        </ul>
      </div>
    </>
  );
}
