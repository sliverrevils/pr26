import { LogOutBtn } from "@/components/buttons/logOutBtn";
import View from "@/components/common/View/View";
import { auth } from "@/config/auth";
import { DevBlock } from "@/helpers/testHelpers";
import ProfileLayoyt from "@/layouts/ProfileLayout/ProfileLayout";
import dayjs from "dayjs";
import Image from "next/image";
import { redirect } from "next/navigation";

const mockAwards = [
    {
        img: "/png/awards/30.png",
        title: "100% Accuracy",
        info: dayjs().format("DD.MM.YYYY"),
    },
    {
        img: "/png/awards/50.png",
        title: "100% Accuracy",
        info: dayjs().format("DD.MM.YYYY"),
    },
    {
        img: "/png/awards/100shots.png",
        title: "100% Accuracy",
        info: dayjs().format("DD.MM.YYYY"),
    },
    {
        img: "/png/awards/1000.png",
        title: "100% Accuracy",
        info: dayjs().format("DD.MM.YYYY"),
    },
    {
        img: "/png/awards/5000.png",
        title: "100% Accuracy",
        info: dayjs().format("DD.MM.YYYY"),
    },
    {
        img: "/png/awards/dailyx5.png",
        title: "100% Accuracy",
        info: dayjs().format("DD.MM.YYYY"),
    },
];

export default async function UserPage() {
    const session = await auth();
    if (!session) return;

    const { user } = session;
    return (
        <View className="flex flex-col gap-y-5" main>
            <h2 className="text-center text-xl font-bold text-f-default">FEED</h2>

            <div className="flex flex-col gap-4">{mockAwards.map(AwardItem)}</div>

            <DevBlock>
                <pre className="text-f-gray-3">{JSON.stringify(user, null, 2)}</pre>
            </DevBlock>
        </View>
    );
}

const AwardItem = (item: (typeof mockAwards)[0]) => (
    <div
        key={item.img}
        className="flex items-center gap-4.75 p-4 bg-f-purple-transparent rounded-xl justify-between"
    >
        <Image src={item.img} width={60} height={60} alt={item.img} />
        <div className="flex-1 text-f-text-default font-bold text-lg">{item.title}</div>
        <div className="text-[14px] text-f-text-light">{item.info}</div>
    </div>
);
