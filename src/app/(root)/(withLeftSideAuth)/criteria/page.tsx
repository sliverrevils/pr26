import Post from "@/components/common/Post/Post";
import View from "@/components/common/View/View";
import Image from "next/image";

export default function AboutPage() {
    return (
        <View className="text-f-default" main>
            <p>
                Our mission is to provide every billiard player a personal dashboard evaluating
                their level and skill dynamics
            </p>
            <p>
                In order to be able to make valid statements about technical skill we defined
                several criteria that describe skill level in terms of quality and quantity. These
                criteria are to become an important guideline at the practice regime of an athlete
                and also a tool for coaches and inspaniduals which helps to develop players skills.
            </p>
            <Post title="Criteria of technical skill">
                <div className="flex w-full">
                    <span className="flex flex-col flex-1 ">
                        <span className="font-bold">Ball pocketing</span>
                        <span>
                            Ratio of balls pocketed to total number of attacking shots. Measured in
                            percent, 0 to 100%. Balls pocketed unintentionally are not considered,
                            neither are safeties and break shots, but balls made on a foul are
                            considered
                        </span>
                    </span>
                    <Image alt="potting" src="/png/potting-ico.png" width={100} height={100} />
                </div>
                <div className="flex w-full ">
                    <span className="flex flex-col flex-1 ">
                        <span className="font-bold">Break shot quality</span>
                        <span>
                            Ratio of successful break shots to total number of break shot attempts.
                            Measured in percent, 0 to 100%. A break shot is successful if at least
                            one ball was pocketed and the player’s inning continued
                        </span>
                    </span>
                    <div className="w-25 flex items-center">
                        <Image alt="potting" src="/png/break-ico.png" width={100} height={100} />
                    </div>
                </div>
                <div className="flex w-full">
                    <span className="flex flex-col flex-1 ">
                        <span className="font-bold">Runouts</span>
                        <span>
                            Ratio of runouts to total number of racks played. Measured in percent, 0
                            to 100%. Runout is a situation where a player stays at the table
                            pocketing all the balls required to win a rack, without the opponent
                            getting a visit at the table. Here not only break and runs are
                            considered but also those racks where the player’s opponent made first
                            (unsuccessful) shot.
                        </span>
                    </span>
                    <div className="w-25 flex items-center">
                        <Image alt="potting" src="/png/run-out-ico.png" width={100} height={100} />
                    </div>
                </div>
                <div className="flex w-full">
                    <span className="flex flex-col flex-1 ">
                        <span className="font-bold">Average run</span>
                        <span>
                            Average number of balls pocketed by the player per inning. Calculated as
                            a ratio of total balls pocketed to total number of innings
                        </span>
                    </span>
                    <div className="w-25 flex items-center">
                        <Image alt="potting" src="/png/run-ico.png" width={100} height={100} />
                    </div>
                </div>
                <div className="flex w-full">
                    <span className="flex flex-col flex-1 ">
                        <span className="font-bold">Safeties</span>
                        <span>
                            Ratio of successful safety shots to total number of safety shots
                            attempted. Measured in percent, 0 to 100%. A safety shot is considered
                            to be successful if:
                        </span>
                        <ul className="p-5 list-disc">
                            <li>the player’s opponent committed a foul after such a safety</li>
                            <li>the player did not leave his opponent an open table</li>
                        </ul>
                    </span>
                    <Image alt="potting" src="/png/safety-ico.png" width={100} height={100} />
                </div>
                <div className="flex w-full">
                    <span className="flex flex-col flex-1 ">
                        <span className="font-bold">Position play</span>
                        <span>
                            Integral value which reflects position play success by three quotients.
                            It denotes the difference between average run and average complexity
                            rate for a certain ball being played.
                        </span>
                    </span>
                    <Image alt="potting" src="/png/leave-ico.png" width={100} height={100} />
                </div>
                <p>
                    An important role in calculation of this goes to the average run, as it is
                    directly linked to cue ball control skills. Average shot complexity is deducted
                    from average run by three aforementioned factors. There is a possibility that
                    this criterion value could turn negative if average run of a player is pretty
                    low.
                </p>
            </Post>
        </View>
    );
}
