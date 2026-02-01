import Post from "@/components/common/Post/Post";
import View from "@/components/common/View/View";
import Image from "next/image";

export default function AboutPage() {
    return (
        <View main>
            <Image alt="" src="/png/table.png" width={830} height={535} className="self-center" />
            <Post title="Shot statistics">
                <p className="flex flex-col">
                    <span className="font-bold">Shot outcome</span>
                    <span>
                        For any attacking kind of a shot our AI algorithm automatically identifies
                        the final outcome as either a pocketed ball or a miss. Shots that don't fall
                        under attacking category are identified as safeties. The shot is considered
                        to be attacking if a player has a feasible chance to pocket an object ball,
                        which is backed up by the player's aggregate actions.
                    </span>
                </p>
                <p className="flex flex-col">
                    <span className="font-bold">Cut angle</span>
                    <span>
                        This is an angle between the direction of aiming line and the direction of
                        object ball movement. 0 degrees corresponds to a straight shot, while 90
                        degrees is considered to be marginal and most severe cut angle (which in
                        reality is about 85-88 degrees).
                    </span>
                </p>
                <p className="flex flex-col">
                    <span className="font-bold">Shot speed</span>
                    <span>
                        Speed is utilized by the player to drive the cue ball and transfer certain
                        impact from the cue stick to the ball
                    </span>
                </p>
                <p className="flex flex-col">
                    <span className="font-bold">Shot distance</span>
                    <span>
                        Distance between the cue ball and the object ball (automatically measured in
                        meters from video capture).
                    </span>
                </p>
                <p className="flex flex-col">
                    <span className="font-bold">Distance to the pocket</span>
                    <span>
                        Distance from the object ball to the pocket (automatically measured in
                        meters from video capture).
                    </span>
                </p>
                <p className="flex flex-col">
                    <span className="font-bold">Cue ball travel distance</span>
                    <span>
                        Distance of cue ball travel after object ball contact (automatically
                        measured in meters from video capture).
                    </span>
                </p>
                <p className="flex flex-col">
                    <span className="font-bold">English</span>
                    <span>
                        Spin direction applied to the cue ball by the player with the cue tip.
                    </span>
                </p>
                <p className="flex flex-col">
                    <span className="font-bold">Shot duration</span>
                    <span>
                        Number of seconds measured from the moment when all balls come to rest at
                        the end of an inning of from the beginning of a shot up to the moment when
                        all moving balls come to rest.
                    </span>
                </p>
            </Post>
            <Post title="Shot complexity">
                <p className="">
                    <Image
                        src="/png/hard-1-ico.png"
                        width={100}
                        height={100}
                        alt="hard1"
                        className="float-left mr-2"
                    />
                    <span>
                        Shot complexity rating is calculated only for attacking shots, regardless of
                        the shot outcome (i.e. no matter whether the ball was pocketed). The shot is
                        considered to be attacking if a player has a feasible chance to pocket an
                        object ball, which is backed up by the player's aggregate actions. Several
                        parameters are taken into account: distance to an object ball, distance to a
                        pocket, cue ball travel distance (position), number of cushion contacts,
                        type and speed of a shot, English if applied, any complications, location,
                        shot direction, etc. Exact formula is not disclosed. We are constantly
                        working to improve it. Our main task is to remove any subjective factors
                        with the use of mathematical statistics in order to provide unified and
                        fact-based analysis of shots complexity.
                    </span>
                </p>
            </Post>
        </View>
    );
}
