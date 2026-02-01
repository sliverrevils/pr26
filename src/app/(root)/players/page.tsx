import View from "@/components/common/View/View";
import TopPlayers from "@/components/content/TopPlayers/TopPlayers";
import UsersSearch from "@/components/ui/UsersSearch/UsersSearch";
import ProfileLayoyt from "@/layouts/ProfileLayout/ProfileLayout";

export default function PlayersPage() {
    return (
        <ProfileLayoyt>
            <View className="flex flex-col  py-8 text-[20px]">
                <h1 className="font-bold text-center text-f-default text-lg">PLAYERS</h1>
                <UsersSearch className="mb-8" />
                <TopPlayers forMain={false} />
            </View>
        </ProfileLayoyt>
    );
}
