import { PropsWithChildren } from "react";

const isShow = process.env.NODE_ENV === "development";
//! DEVELOPMENT HELPERS
export const logDev = (...data: any[]) => {
    isShow && console.log(data);
};

export function DevBlock(prop: PropsWithChildren) {
    if (!isShow) {
        return false;
    }

    return prop.children;
}
