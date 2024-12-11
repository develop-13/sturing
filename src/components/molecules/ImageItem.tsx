import React from "react";
import Image from "../atoms/Image";
import { ImageProps } from "next/image";
import Icon from "../atoms/Icon";

type TImagItem = ImageProps & {
  onClose: () => void;
};

function ImageItem(props: TImagItem) {
  const { alt, onClose, onClick, ...restProps } = props;

  console.log(typeof props.src);

  return (
    <div className="relative">
      <Image
        {...restProps}
        src={props.src}
        width={props.width}
        height={props.height}
      />
      <span
        className="absolute top-1 right-1 p-1 rounded-full bg-white"
        onClick={onClose}
      >
        <Icon className="" type="CLOSE" />
      </span>
    </div>
  );
}

export default ImageItem;
