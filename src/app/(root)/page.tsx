import { LastMatches } from "@/components/content/LastMatches/LastMatches";
import MainSlider from "@/components/content/MainSlider/MainSlider";
import Possibilities from "@/components/content/Possibilities/Possibilities";
import RegisterNow from "@/components/content/RegisterNow/RegisterNow";
import TopPlayers from "@/components/content/TopPlayers/TopPlayers";
import { Suspense } from "react";

export default function Home() {
    return (
        <div className=" w-full flex flex-col gap-12 pb-11 bg-white">
            <MainSlider />
            <div className="flex flex-col gap-24.5 pb-11">
                <Suspense fallback={<div>Loading ...</div>}>
                    <LastMatches count={9} />
                </Suspense>

                <TopPlayers />

                <RegisterNow />

                <Possibilities />
            </div>
        </div>
    );
}
