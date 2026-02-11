import View from "@/components/common/View/View";
import Workouts from "@/components/filters/Workouts/Workouts";
import { auth } from "@/config/auth";
import { getCurrentUser } from "@/services/userService";

export default async function WorkoutsPage() {
    return (
        <View main>
            <h2 className="text-center text-xl font-bold text-f-default">WORKOUTS</h2>
            <Workouts />
        </View>
    );
}
