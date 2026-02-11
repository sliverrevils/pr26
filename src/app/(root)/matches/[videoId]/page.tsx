import { PieChart } from "@/components/charts/PieChart";
import View from "@/components/common/View/View";
import Shots from "@/components/content/Shots/Shots";
import { DevBlock, logDev } from "@/helpers/testHelpers";

import MatchLayoyt from "@/layouts/MatchLayout/MatchLayout";
import PlayerLayoyt from "@/layouts/PlayerLayout/PlayerLayout";
import { findMatchByVideoId } from "@/services/matchSearchService";
import { findPlayerByAlias } from "@/services/playerService";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ videoId: string }> };

export default async function MatchPage({ params }: Props) {
    const { videoId } = await params;
    const match = await findMatchByVideoId(videoId);

    logDev(match);

    if (!match) notFound();
    return (
        <MatchLayoyt match={match} className="flex flex-col lg:flex-row">
            <div className="flex flex-col w-full">
                <Shots video={match.videoId} view="match" />

                <DevBlock>
                    <pre className="text-[10px] text-f-gray-3">
                        {JSON.stringify(match, null, 2)}
                    </pre>
                </DevBlock>
            </div>
        </MatchLayoyt>
    );
}
