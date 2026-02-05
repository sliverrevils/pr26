import { HTMLAttributes, PropsWithChildren } from "react";

export default function Block({
    children,
    className = "",
    ...divProps
}: PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...divProps}
            className={`rounded-xl p-4
                        ${className}
        `}
        >
            {children}
        </div>
    );
}
