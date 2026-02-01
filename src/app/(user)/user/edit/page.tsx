import View from "@/components/common/View/View";
import EditProfileForm from "@/components/forms/EditProfileForm/EditProfileForm";
import { getCurrentUser } from "@/services/userService";

export default async function EditProfilePage() {
    const user = await getCurrentUser();
    return (
        <View main>
            <EditProfileForm user={user!} />
        </View>
    );
}
