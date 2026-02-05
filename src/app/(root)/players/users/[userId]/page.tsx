import PlayerLayoyt from "@/layouts/PlayerLayout/PlayerLayout";
import { findPlayerByAlias } from "@/services/playerService";
import { findUserByAlias } from "@/services/userService";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ userId: string }> };

export default async function PlayerPage({ params }: Props) {
    const { userId } = await params;
    const user = await findUserByAlias(userId);
    if (!user) notFound();
    return <PlayerLayoyt player={user}></PlayerLayoyt>;
}
