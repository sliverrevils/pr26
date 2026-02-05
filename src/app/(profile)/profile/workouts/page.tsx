import View from "@/components/common/View/View";
import Workouts from "@/components/filters/Workouts/Workouts";

export default function WorkoutsPage() {
    return (
        <View main>
            <h2 className="text-center text-xl font-semibold text-f-default">WORKOUTS</h2>
            <Workouts />
        </View>
    );
}
