"use client";
import { SlMenu } from "react-icons/sl";
import IconFormat from "../../common/atoms/IconFormat";
import { useRouter } from "next/navigation";

function MenuBtn() {
  const router = useRouter();

  return (
    <div>
      <IconFormat
        onClick={() => {
          router.push("/sidebar");
        }}
        icon={<SlMenu />}
      />
    </div>
  );
}

export default MenuBtn;
