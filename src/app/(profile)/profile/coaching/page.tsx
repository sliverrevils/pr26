import View from "@/components/common/View/View";
import RaportList from "@/components/content/RaportList/RaportList";
import { getCurrentUserRaports } from "@/services/reportsService";

export default async function CoachingPage() {
    const raports = await getCurrentUserRaports();
    return (
        <View main>
            <h2 className="text-center text-xl font-bold text-f-default">COACHING</h2>
            <RaportList raports={raports} />
        </View>
    );
}
