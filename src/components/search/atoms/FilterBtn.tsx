import IconFormat from "@/components/common/atoms/IconFormat";
import Image from "next/image";

function FilterBtn() {
  return (
    <IconFormat
      icon={<Image src="/svg/ect/filter.svg" alt="" width={24} height={24} />}
    />
  );
}

export default FilterBtn;
