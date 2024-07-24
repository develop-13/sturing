"use client";

import { useRouter } from "next/navigation";
import Icon from "../atoms/Icon";
import ButtonLabel from "../molecules/ButtonLabel";

export default function StudyCategory() {
  let isDragging = true;
  const dragging = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    if (!isDragging) return;
    e.currentTarget.scrollLeft -= e.movementX;
  };

  const router = useRouter();

  const onClickHandler = () => {
    router.push("search/result");
  };

  return (
    <>
      <div className="relative overflow-x-hidden">
        <ul
          className="flex gap-2 overflow-x-hidden list-none px-2"
          onMouseMove={dragging}
          onMouseDown={() => (isDragging = true)}
          onMouseUp={() => (isDragging = false)}
          onMouseLeave={() => (isDragging = false)}
        >
          <ButtonLabel
            datas={{
              text: "디자인",
              theme: "ordinary",
              role: "category",
              onClick: onClickHandler,
              icon: <Icon type="DESIGN" />,
            }}
          />
          <ButtonLabel
            datas={{
              text: "개발·테크",
              theme: "ordinary",
              role: "category",
              onClick: onClickHandler,
              icon: <Icon type="TECH" />,
            }}
          />
          <ButtonLabel
            datas={{
              text: "마케팅",
              theme: "ordinary",
              role: "category",
              onClick: onClickHandler,
              icon: <Icon type="MARKETING" />,
            }}
          />
          <ButtonLabel
            datas={{
              text: "비즈니스",
              theme: "ordinary",
              role: "category",
              onClick: onClickHandler,
              icon: <Icon type="BUSINESS" />,
            }}
          />
          <ButtonLabel
            datas={{
              text: "경제",
              theme: "ordinary",
              onClick: onClickHandler,
              role: "category",
              icon: <Icon type="ECONOMY" />,
            }}
          />
          <ButtonLabel
            datas={{
              text: "외국어",
              theme: "ordinary",
              onClick: onClickHandler,
              role: "category",
              icon: <Icon type="LANGUAGE" />,
            }}
          />
          <ButtonLabel
            datas={{
              text: "자격증",
              theme: "ordinary",
              onClick: onClickHandler,
              role: "category",
              icon: <Icon type="CERTIFICATION" />,
            }}
          />
          <ButtonLabel
            datas={{
              text: "자기계발",
              theme: "ordinary",
              onClick: onClickHandler,
              role: "category",
              icon: <Icon type="SELFDEVELOP" />,
            }}
          />
        </ul>
      </div>
    </>
  );
}
