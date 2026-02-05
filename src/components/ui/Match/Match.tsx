import { IMatchesSearch } from "@/mongo/models/matchSearchModel";
import OponentCard from "../OponentCard/OponentCard";
import Link from "next/link";
import { PATHES } from "@/config/pathes";
import { Avatar } from "../Avatar/Avatar";

export const Match = ({
    match,
    forInfo = false,
    bigTextScore = true,
    linkedOponents = true,
    className = "",
    noPadding = false,
    resultStyle = false,
}: {
    match: IMatchesSearch;
    forInfo?: boolean;
    bigTextScore?: boolean;
    linkedOponents?: boolean;
    className?: string;
    noPadding?: boolean;
    resultStyle?: boolean;
}) => {
    const [isFirstWin, isSecondWin] = [
        match.score?.[0] >= match.score?.[1],
        match.score?.[1] >= match.score?.[0],
    ];
    const Tag = bigTextScore ? Link : "div";
    return (
        <Tag
            href={PATHES.match.path + match.videoId}
            className={` animate-fade-in 
                    ${resultStyle ? "" : "rounded-2xl"}
                     ${noPadding ? "" : "p-4"}                      
                     ${forInfo ? "bg-white" : "bg-f-gray-4"} 
                     ${className} 
                     `}
        >
            {!forInfo && (
                <div className="text-f-default text-[18px] font-bold text-center">
                    {match.event?.name || "Unknown event"}
                </div>
            )}

            <div
                className={`flex justify-between 
                            ${resultStyle ? "xl:justify-between" : "xl:justify-around"}
                            `}
            >
                <div
                    className={
                        resultStyle
                            ? `${isFirstWin ? "bg-f-green-transparent2" : "bg-f-red-transparent"} p-2 rounded-xl`
                            : ""
                    }
                >
                    <Avatar
                        human={match.opponents?.[0]}
                        size="oponent"
                        showName
                        className="self-start"
                        link={linkedOponents}
                        nameStyle={
                            resultStyle
                                ? isFirstWin
                                    ? "text-f-green-main"
                                    : "text-f-red-main"
                                : ""
                        }
                    />
                </div>

                <div
                    className={`${bigTextScore ? "text-[63px]" : "text-[40px]"} text-f-default font-bold flex items-center`}
                >
                    <span className={isFirstWin ? "text-f-green-main" : "text-f-red-main"}>
                        {match.score?.[0]}
                    </span>
                    <span>:</span>
                    <span className={isSecondWin ? "text-f-green-main" : "text-f-red-main"}>
                        {match.score?.[1]}
                    </span>
                </div>
                <div
                    className={
                        resultStyle
                            ? `${isSecondWin ? "bg-f-green-transparent2" : "bg-f-red-transparent"} p-2 rounded-xl`
                            : ""
                    }
                >
                    <Avatar
                        human={match.opponents?.[1]}
                        size="oponent"
                        showName
                        className="self-start"
                        link={linkedOponents}
                        nameStyle={
                            resultStyle
                                ? isSecondWin
                                    ? "text-f-green-main"
                                    : "text-f-red-main"
                                : ""
                        }
                    />
                </div>
            </div>
        </Tag>
    );
};
