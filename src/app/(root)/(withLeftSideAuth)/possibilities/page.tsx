"use client";
import LinkText from "@/components/common/LinkText/LinkText";
import Post from "@/components/common/Post/Post";
import Video from "@/components/common/Video/Video";
import View from "@/components/common/View/View";
import { PATHES } from "@/config/pathes";
import Image from "next/image";
import Link from "next/link";

export default function PossibilitiesPage() {
    return (
        <View xPadding={false} main>
            <Post title="Ball trajectory automated modeling system">
                <p>
                    The set of basic algorithms developed by us recognize the trajectory of movement
                    on any static billiard video with an efficiency of up to 95%. The novelty lies
                    in the fact that our system works equally effectively in a very wide range of
                    operating conditions, from a conventional smartphone to professional cameras.
                    Unlike existing algorithms that impose very strict initial requirements on the
                    quality of the incoming video and work effectively only for strictly verified,
                    calibrated conditions.
                    <Video src="/video/3XD2PYshAystiTp5e_Trim.mp4" className="mt-5" />
                </p>
            </Post>
            <Post title="Players research">
                <p>
                    Quality and up-to-date database of real players, continuously updated and
                    moderated. Over 750 players present at the moment of service launch. The
                    performance criteria is real for every player listed. The requirement for new
                    player to be added is presence of video recordings featuring such a player, as
                    of 2019 and later.
                </p>
                <p>
                    In order to check the results, one could just enter a part of the player's name
                    at thesearch page. Sometimes alphabetical order listing could be more
                    convenient.
                </p>
                <Image
                    className="rounded-2xl"
                    alt="playerSearch"
                    src="/png/search.png"
                    width={830}
                    height={103}
                />
            </Post>
            <Post title="Players performance view">
                <p className="flex flex-col gap-2">
                    <span>
                        Players pages offer free access to basic technical and individual
                        performance data which describe the level of a certain player and his
                        personal playing style both from qualitative and quantitative perspective.
                        This data calculation is based on statistics gathered by artificial
                        intelligence during video recordings processing. More information on
                        players’ data is at{" "}
                        <LinkText pathTo="criteria" text="performance data page" />
                        .More information on statistics is at the{" "}
                        <LinkText pathTo="statistics" text="shot statistics page" />.
                    </span>
                    <Image
                        className="rounded-2xl"
                        alt=""
                        src="/png/params.png"
                        width={700}
                        height={356}
                    />
                    <Image
                        className="rounded-2xl"
                        alt=""
                        src="/png/params2.png"
                        width={700}
                        height={355}
                    />
                </p>
            </Post>
            <Post title="Players development tracking">
                <p>
                    Our server infrastructure allows for most efficient and unified storage of
                    players performance data in Big Data format. This enables analyzing any change
                    dynamics over a certain period.
                </p>
                <Image
                    className="rounded-2xl"
                    alt=""
                    src="/png/dynamic.png"
                    width={800}
                    height={400}
                />
            </Post>
            <Post title="Identifying growth areas for players">
                <p>
                    Based on shots statistics the service automatically points to the fundamentals
                    which are not ideal. This allows to focus the practice sessions on proper areas
                    and increase overall level of play more efficiently.
                </p>

                <Image
                    className="rounded-2xl"
                    alt=""
                    src="/png/shot1.png"
                    width={350}
                    height={303}
                />

                <Image
                    className="rounded-2xl"
                    alt=""
                    src="/png/shot2.png"
                    width={350}
                    height={303}
                />

                <Image
                    className="rounded-2xl"
                    alt=""
                    src="/png/shot3.png"
                    width={350}
                    height={303}
                />

                <Image
                    className="rounded-2xl"
                    alt=""
                    src="/png/shot4.png"
                    width={350}
                    height={303}
                />

                <Image
                    className="rounded-2xl"
                    alt=""
                    src="/png/shot5.png"
                    width={350}
                    height={303}
                />

                <Image
                    className="rounded-2xl"
                    alt=""
                    src="/png/shot4.png"
                    width={350}
                    height={303}
                />
            </Post>
            <Post title="Matches analysis">
                <p>
                    The service provides players’ individual performance comparison and shots stats
                    analysis through a certain match. More information on shots statistics is at the{" "}
                    <LinkText pathTo="statistics" />
                    .Shots chart can be sorted by main parameters. At most shots one is able to
                    access a diagram which is generated automatically.
                </p>

                <Image
                    className="rounded-2xl"
                    alt=""
                    src="/png/compare.png"
                    width={650}
                    height={488}
                />

                <Image
                    className="rounded-2xl"
                    alt=""
                    src="/png/match.png"
                    width={800}
                    height={500}
                />

                <Image
                    className="rounded-2xl"
                    alt=""
                    src="/png/scheme.png"
                    width={800}
                    height={555}
                />
            </Post>
            <Post title="Practice sessions analysis">
                <p>
                    Players can use our service to analyze the video recordings of their own
                    practice sessions. This service is provided under restricted access conditions
                    and on a fee paid basis. In member area players can access extended analysis
                    functionality and their progress tracking. There is also a possibility of
                    external access given to a coach or player's partner in order to enable
                    cooperative work.
                </p>
                <p>
                    Practice sessions analytical data remain private and make no impact on overall
                    rating. With the use of this any player can efficiently track the level and
                    dynamics of their own skill
                </p>

                <Image
                    className="rounded-2xl"
                    alt=""
                    src="/png/list.png"
                    width={830}
                    height={880}
                />

                <Image className="rounded-2xl" alt="" src="/png/one.jpg" width={730} height={850} />
            </Post>
            <Post title="Real time shot visualization">
                <p>
                    We impose on the video a graphic layer with a 3D effect with lines for
                    visualizing the trajectories of the balls. For the top view, the system works in
                    real time, which allows it to be used for sports broadcasts.
                </p>
                <Video src="/video/port_BimfTo3inhuhLDrvS.mp4" />
            </Post>
        </View>
    );
}
