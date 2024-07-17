import { ReactNode } from "react";

export type TBox = {
    theme?: TBoxColorTheme;
    shape?: TBoxShape;
};

type TBoxColorTheme =
    | "primary"
    | "secondary"
    | "ordinary"
    | "transparent-border"
    | "transparent";

type TBoxShape = "tag" | "rounded" | "button" | "imagebox";

function BoxTheme(theme: TBoxColorTheme | undefined) {
    switch (theme) {
        case "primary":
            return "bg-mainColor ";
        case "secondary":
            return "bg-white border border-mainColor ";
        case "ordinary":
            return "bg-white border border-gray-400 ";
        case "transparent-border":
            return "bg-transparent border border-main-200 ";
        case "transparent":
            return "bg-transparent ";
        default:
            return " ";
    }
}

function BoxShape(shape: TBoxShape | undefined) {
    switch (shape) {
        case "tag":
            return "rounded-[3px] h-[22px] ";
        case "rounded":
            return "rounded-full h-[50px] ";
        case "button":
            return "rounded-[5px] h-[42px] ";
        case "imagebox":
            return "rounded-[8px] h-[100px] w-[182px] ";
        default:
            return " ";
    }
}

function Box({ props, children }: { props: TBox; children?: ReactNode }) {
    const theme = BoxTheme(props.theme);
    const shape = BoxShape(props.shape);

    return (
        <>
            <div
                className={"flex justify-center items-center " + theme + shape}
            >
                {children}
            </div>
        </>
    );
}

export default Box;
