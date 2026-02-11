import ProfileMenu from "@/components/menus/ProfileMenu/ProfileMenu";
import PlayerInfo from "@/components/ui/PlayerInfo/PlayerInfo";
import { IPlayerSearch } from "@/mongo/models/playersSearchModel";
import { IUser } from "@/mongo/models/userModel";
import { getCurrentUser } from "@/services/userService";
import { Activity, PropsWithChildren } from "react";
import clsx from "clsx";
export default async function PlayerLayoyt({
    children,
    player,
    className = "",
}: PropsWithChildren & { player: Partial<IPlayerSearch & IUser>; className?: string }) {
    const user = await getCurrentUser();
    return (
        <div className={clsx("container gap-5 items-start pt-8 pb-16", className)}>
            <div className="flex flex-col gap-5 w-full max-w-87">
                <PlayerInfo player={player} />
                <ProfileMenu className="hidden lg:flex" user={user} />
            </div>
            {children}
        </div>
    );
}
