import Img from "next/image";

type TImage = {
  src: string;
  width: number;
  height: number;
};

function Image({ datas }: { datas: TImage }) {
  <Img src={datas.src} width={datas.width} height={datas.height} alt="" />;
}

export default Image;
