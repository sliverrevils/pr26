import LeftSideBlock from "@/components/ui/LeftSideBlock/LeftSideBlock";
import { getCurrentUser, getCurrentUserWithFavorites } from "@/services/userService";
import { PropsWithChildren } from "react";

export default async function ProfileLayoyt({ children }: PropsWithChildren) {
    const user = await getCurrentUserWithFavorites();

    return (
        <div className="container flex flex-col lg:flex-row gap-5 items-start pt-8 pb-16 w-full ">
            <LeftSideBlock user={user} />

            <div className="flex-1 w-full">{children}</div>
        </div>
    );
}
