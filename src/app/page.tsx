import Test_Link from "@/components/Test_Link";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center ">
                <h1 className="text-4xl font-bold py-4">Home Page</h1>
                <div className="flex flex-row m-2 h-10 gap-4">
                    <Test_Link href="his/">황인성</Test_Link>
                    <Test_Link href="jhc/">조현창</Test_Link>
                    <Test_Link href="jhd/">정현도</Test_Link>
                    <Test_Link href="jjs/">정재상</Test_Link>
                    <Test_Link href="kdh/">김동현</Test_Link>
                </div>
            </div>
        </>
    );
}
