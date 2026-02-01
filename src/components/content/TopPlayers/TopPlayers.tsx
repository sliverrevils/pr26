import PlayerCard from "@/components/ui/PlayerCard/PlayerCard";
import { findTopPlayers } from "@/services/playerService";
import ContentLine from "../ContentLine/ContentLine";

export default async function TopPlayers({ forMain = true }: { forMain?: boolean }) {
    const players = await findTopPlayers();

    return (
        <div className="container self-center  flex flex-col">
            {forMain && (
                <ContentLine
                    imgUrl="/svg/players-checkmarked.svg"
                    textGray="Top"
                    textBlue="players"
                />
            )}
            <div className="flex flex-wrap gap-x-16 gap-y-4 justify-center ">
                {players.map((palyer) => (
                    <PlayerCard key={palyer.alias} player={palyer} foMain={forMain} />
                ))}
            </div>
        </div>
    );
}
