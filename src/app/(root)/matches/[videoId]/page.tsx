import View from "@/components/common/View/View";
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
        <MatchLayoyt match={match}>
            <>
                <View className="flex flex-col  py-8 text-[20px] ">
                    <h1 className="font-bold text-center text-f-default text-lg">RACK</h1>

                    <DevBlock>
                        <pre className="text-[10px] text-f-gray-3">
                            {JSON.stringify(match, null, 2)}
                        </pre>
                    </DevBlock>
                </View>
            </>
        </MatchLayoyt>
    );
}
