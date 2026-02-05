import ProfileMenu from "@/components/menus/ProfileMenu/ProfileMenu";
import PlayerInfo from "@/components/ui/PlayerInfo/PlayerInfo";
import { IPlayerSearch } from "@/mongo/models/playersSearchModel";
import { IUser } from "@/mongo/models/userModel";
import { getCurrentUser } from "@/services/userService";
import { Activity, PropsWithChildren } from "react";

export default async function PlayerLayoyt({
    children,
    player,
}: PropsWithChildren & { player: Partial<IPlayerSearch & IUser> }) {
    const user = await getCurrentUser();
    return (
        <div className="container flex gap-5 items-start pt-8 pb-16">
            <div className="flex flex-col gap-5 w-full max-w-87">
                <PlayerInfo player={player} />
                <ProfileMenu user={user} />
            </div>
            {children}
        </div>
    );
}
