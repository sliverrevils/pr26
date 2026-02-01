import PlayerLayoyt from "@/layouts/PlayerLayout/PlayerLayout";
import { findPlayerByAlias } from "@/services/playerService";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ alias: string }> };

export default async function PlayerPage({ params }: Props) {
    const { alias } = await params;
    const player = await findPlayerByAlias(alias);
    if (!player) notFound();
    return <PlayerLayoyt player={player}></PlayerLayoyt>;
}
