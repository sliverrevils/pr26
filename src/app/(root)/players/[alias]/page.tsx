import View from "@/components/common/View/View";
import { Match } from "@/components/ui/Match/Match";
import PlayerLayoyt from "@/layouts/PlayerLayout/PlayerLayout";
import { findFilteredMatches } from "@/services/matchSearchService";
import { findPlayerByAlias } from "@/services/playerService";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ alias: string }> };

export default async function PlayerPage({ params }: Props) {
    const { alias } = await params;
    const player = await findPlayerByAlias(alias);
    const mathes = await findFilteredMatches({ page: 1, searchParams: {} });
    if (!player) notFound();
    return (
        <PlayerLayoyt className="flex flex-col lg:flex-row" player={player}>
            <View className="flex flex-col  py-8 text-[20px] ">
                <h1 className="font-bold text-center text-f-default text-lg">LAST MATHES</h1>

                {mathes.map((match) => (
                    <Match key={match._id} match={match} />
                ))}
            </View>
        </PlayerLayoyt>
    );
}
