import { IMatchesSearch } from "@/mongo/models/matchSearchModel";
import OponentCard from "../OponentCard/OponentCard";
import Link from "next/link";
import { PATHES } from "@/config/pathes";

export const Match = ({ match }: { match: IMatchesSearch }) => {
    const [isFirstWin, isSecondWin] = [
        match.score?.[0] >= match.score?.[1],
        match.score?.[1] >= match.score?.[0],
    ];

    return (
        <Link
            href={PATHES.match.path + match._id}
            className="bg-f-gray-4 p-4 rounded-2xl animate-fade-in"
        >
            <div className="text-f-default text-[18px] font-bold text-center">
                {match.event?.name || "unnamed event"}
            </div>

            <div className="flex justify-between items-center">
                <OponentCard oponent={match.opponents?.[0] || null} win={isFirstWin} />

                <div className="text-[64px] text-f-default font-bold flex items-center">
                    <span className={isFirstWin ? "text-f-green-main" : "text-f-red-main"}>
                        {match.score?.[0]}
                    </span>
                    <span>:</span>
                    <span className={isSecondWin ? "text-f-green-main" : "text-f-red-main"}>
                        {match.score?.[1]}
                    </span>
                </div>

                <OponentCard oponent={match.opponents?.[1] || null} win={isSecondWin} />
            </div>
        </Link>
    );
};
