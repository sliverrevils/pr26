import { PropsWithChildren } from "react";

export default function View({
    children,
    className = "",
    xPadding = true,
    gap = true,
    main = false,
}: PropsWithChildren & { className?: string; xPadding?: boolean; gap?: boolean; main?: boolean }) {
    return (
        <article
            className={`bg-white rounded-2xl w-full
                ${xPadding ? "p-4" : "py-5"} 
                flex flex-col 
                ${gap ? "gap-5" : ""}                
                ${main ? "pt-8" : ""}
                ${className}
                `}
        >
            {children}
        </article>
    );
}
