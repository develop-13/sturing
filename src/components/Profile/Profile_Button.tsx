import Image from "next/image";
import { FcAbout } from "react-icons/fc";

type TProfile_Button_Type = {
    isChecked: boolean;
    src: string;
    children: React.ReactNode;
};

export default function Profile_Button(props: TProfile_Button_Type) {
    const { src, children, isChecked } = props;
    return (
        <>
            <div
                className={
                    `flex w-[164px] h-[90px] items-center justify-center ` +
                    `rounded-lg border ` +
                    `text-[16px] ` +
                    (isChecked &&
                        `border-[#4171FF] font-bold text-[#4171FF] `) +
                    (!isChecked &&
                        `border-[#E3E3E3] font-normal text-[#676767] `)
                }
            >
                <button className="flex flex-row gap-[10px]">
                    {/* <Image src={src} alt="" /> {children} */}
                    <FcAbout />
                    {children}
                </button>
            </div>
        </>
    );
}
