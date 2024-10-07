import Img from "next/image";

type TImage = {
  src: string;
  width: number;
  height: number;
  onClick?: () => void;
  className?: string;
};

function Image(props: TImage) {
  return <Img alt="" {...props} />;
}

export default Image;
