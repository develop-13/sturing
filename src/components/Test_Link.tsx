import Link, { LinkProps } from "next/link";

type TTest_Link = LinkProps & {
    children: React.ReactNode;
};

export default function Test_Link(props: TTest_Link) {
    return (
        <>
            <Link
                href={props.href}
                className="flex items-center justify-center w-40 bg-slate-300 text-lg rounded-lg"
            >
                {props.children}
            </Link>
        </>
    );
}
