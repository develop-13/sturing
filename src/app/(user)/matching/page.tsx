import Profile_Button from "@/components/Profile/Profile_Button";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

export default function page() {
    return (
        <>
            <div
                className={`flex flex-col w-full h-screen ` + roboto.className}
            >
                <text>웅진님 안녕하세요</text>
                <li>
                    <Profile_Button src="" isChecked={false}>
                        디자인
                    </Profile_Button>
                    <Profile_Button src="" isChecked={false}>
                        디자인
                    </Profile_Button>
                    <Profile_Button src="" isChecked={false}>
                        디자인
                    </Profile_Button>
                    <Profile_Button src="" isChecked={false}>
                        디자인
                    </Profile_Button>
                </li>
            </div>
        </>
    );
}
