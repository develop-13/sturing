import { LinkProps } from "next/link";

type TButtuon = LinkProps & {
    children: React.ReactNode;
};

export default function Rounded_Button(props: TButtuon) {
    const { children } = props;
    return (
        <>
            <button className="">{children}</button>
        </>
    );
}
