import ProfileMenu from "@/components/menus/ProfileMenu/ProfileMenu";

import MatchInfo from "@/components/ui/MatchInfo/MatchInfo";

import { getCurrentUser } from "@/services/userService";
import { PropsWithChildren } from "react";
import clsx from "clsx";
import { IDrill } from "@/mongo/models/drillsModel";
import WorkoutInfo from "@/components/ui/WorkoutInfo/WorkoutInfo";

export default async function WorkoutLayout({
    children,
    drill,
    className,
}: PropsWithChildren & { drill: IDrill; className?: string }) {
    const user = await getCurrentUser();
    return (
        <div className={clsx("container  gap-5 items-start pt-8 pb-16", className)}>
            <div className="flex flex-col gap-5 w-full max-w-87">
                <WorkoutInfo drill={drill} />
                <ProfileMenu className="hidden lg:flex" user={user} />
            </div>
            {children}
        </div>
    );
}
