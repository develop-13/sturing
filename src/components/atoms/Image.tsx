import Img, { ImageProps } from "next/image";

type TImage = ImageProps & {
  onClick?: () => void; // 추가적으로 onClick을 포함하고 싶다면 명시적으로 추가 가능
};

function Image(props: Omit<TImage, "alt">) {
  // alt 속성을 제외
  return <Img alt="" {...props} />; // alt 값을 빈 문자열로 고정
}

export default Image;
