import Block from "@/components/common/Block/Block";
import clsx from "clsx";
import { PropsWithChildren } from "react";
export default function CoachingContent({ className = "" }: { className?: string }) {
    return (
        <div className={clsx("w-full flex flex-col gap-4", className ? className : "")}>
            <CoachingContentItem title="CHALLENGE">
                <Block className="bg-f-green-transparent2" />
            </CoachingContentItem>

            <CoachingContentItem title={"TRENDS"}></CoachingContentItem>
        </div>
    );
}

const CoachingContentItem = ({ children, title }: PropsWithChildren & { title: string }) => {
    return (
        <div className="flex flex-col gap-3.75">
            <div className="text-center text-f-text-default font-bold">{title}</div>
            {children}
        </div>
    );
};
