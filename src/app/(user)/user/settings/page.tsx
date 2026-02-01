import View from "@/components/common/View/View";
import SettingsProfileForm from "@/components/forms/SettingsProfileForm/SettingsProfileForm";
import { getCurrentUser } from "@/services/userService";

export default async function SettingsPage() {
    const user = await getCurrentUser();
    return (
        <View main>
            <SettingsProfileForm user={user!} />
        </View>
    );
}
