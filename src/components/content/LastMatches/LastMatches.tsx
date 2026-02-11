import { IMatchesSearch } from "@/mongo/models/matchSearchModel";
import ContentLine from "../../common/ContentLine/ContentLine";
import { Match } from "@/components/ui/Match/Match";
import getLastMathes from "@/services/matchSearchService";

export const LastMatches = async ({ count }: { count: number }) => {
    const lastMathes = await getLastMathes({ count });
    return (
        <div className=" container self-center  flex flex-col">
            <ContentLine imgUrl="/svg/new_matches.svg" textGray="New" textBlue="matches" />
            <div
                className="grid grid-cols-1 gap-4
                            md:grid-cols-2
                            xl:grid-cols-3
                            "
            >
                {lastMathes.map((match) => (
                    <Match
                        match={match}
                        key={match._id}
                        linkedOponents={false}
                        scoreStyle={false}
                    />
                ))}
            </div>
        </div>
    );
};
