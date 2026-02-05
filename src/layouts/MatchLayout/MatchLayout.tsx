import View from "@/components/common/View/View";
import ProfileMenu from "@/components/menus/ProfileMenu/ProfileMenu";
import AuthToggle from "@/components/ui/AuthToggle/AuthToggle";
import MatchInfo from "@/components/ui/MatchInfo/MatchInfo";
import PlayerInfo from "@/components/ui/PlayerInfo/PlayerInfo";
import UserInfo from "@/components/ui/UserInfo/UserInfo";
import { IMatchFilters } from "@/hooks/useMatchFilters";
import { IMatchesSearch } from "@/mongo/models/matchSearchModel";
import { IPlayer } from "@/mongo/models/playerModel";
import { getCurrentUser } from "@/services/userService";
import { Activity, PropsWithChildren } from "react";

export default async function MatchLayoyt({
    children,
    match,
}: PropsWithChildren & { match: IMatchesSearch }) {
    const user = await getCurrentUser();
    return (
        <div className="container flex gap-5 items-start pt-8 pb-16">
            <div className="flex flex-col gap-5 w-full max-w-87">
                <MatchInfo match={match} />
                <ProfileMenu user={user} />
            </div>
            {children}
        </div>
    );
}
