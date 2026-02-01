import { LogOutBtn } from "@/components/buttons/logOutBtn";
import View from "@/components/common/View/View";
import { auth } from "@/config/auth";
import ProfileLayoyt from "@/layouts/ProfileLayout/ProfileLayout";
import { redirect } from "next/navigation";

export default async function UserPage() {
    const session = await auth();
    if (!session) return;

    const { user } = session;
    return (
        <View className="flex flex-col gap-y-5" main>
            <h2 className="text-center text-xl font-semibold text-f-default">FEED</h2>
            {process.env.NODE_ENV === "development" && (
                <pre className="text-f-gray-3">{JSON.stringify(user, null, 2)}</pre>
            )}
        </View>
    );
}
