import { IMatchesSearch } from "@/mongo/models/matchSearchModel";
import ContentLine from "../ContentLine/ContentLine";
import { Match } from "@/components/ui/Match/Match";
import getLastMathes from "@/services/matchSearchService";

export const LastMatches = async ({ count }: { count: number }) => {
    const lastMathes = await getLastMathes({ count });
    return (
        <div className=" container self-center  flex flex-col">
            <ContentLine imgUrl="/svg/new_matches.svg" textGray="New" textBlue="matches" />
            <div className="grid grid-cols-3 gap-4">
                {lastMathes.map((match) => (
                    <Match match={match} key={match._id} />
                ))}
            </div>
        </div>
    );
};
