import React from "react";
import Image from "../atoms/Image";
import { ImageProps } from "next/image";
import Icon from "../atoms/Icon";

type TImagItem = ImageProps & {
  onClose: (imgId: string) => void;
  imageId: string;
};

function ImageItem(props: TImagItem) {
  const { alt, onClose, onClick, imageId, ...restProps } = props;

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
        onClick={() => {
          onClose(imageId);
        }}
      >
        <Icon type="CLOSE" />
      </span>
    </div>
  );
}

export default React.memo(ImageItem);
