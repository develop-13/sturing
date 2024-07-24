import Img from "next/image";

type TImage = {
  src: string;
  width: number;
  height: number;
};

function Image(props: TImage) {
  return (
    <Img src={props.src} width={props.width} height={props.height} alt="" />
  );
}

export default Image;
