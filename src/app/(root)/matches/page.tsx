import View from "@/components/common/View/View";
import Matches from "@/components/ui/Mathes/Matches";
import { IMatchFilters } from "@/hooks/useMatchFilters";
import ProfileLayoyt from "@/layouts/ProfileLayout/ProfileLayout";

export default async function MatchesPage(props: { searchParams: Promise<IMatchFilters> }) {
    const searchParams = await props.searchParams;

    return (
        <ProfileLayoyt>
            <View className="flex flex-col  py-8 text-[20px] ">
                <h1 className="font-bold text-center text-f-default text-lg">MATHES</h1>
                <Matches searchParams={searchParams} />
            </View>
        </ProfileLayoyt>
    );
}
