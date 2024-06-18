import Rounded_Button from "@/components/Button";
import Icon_Logo from "@/svg/Icon-logo";
import { SlMenu } from "react-icons/sl";

export default function Home() {
    return (
        <>
            <div className="flex items-center w-auto h-[54px] mx-6">
                <SlMenu className="text-[32px] pr-3" />
                <Icon_Logo />
                <div className="ml-auto">
                    <Rounded_Button className="w-[71px] h-[34px] border-blue-500">
                        <p className="text-[10px] text-blue-500">간편로그인</p>
                    </Rounded_Button>
                </div>
            </div>
        </>
    );
}
