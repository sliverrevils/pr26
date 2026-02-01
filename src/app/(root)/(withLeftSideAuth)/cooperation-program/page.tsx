import LinkText from "@/components/common/LinkText/LinkText";
import Post from "@/components/common/Post/Post";
import View from "@/components/common/View/View";
import { PATHES } from "@/config/pathes";
import Link from "next/link";

export default function cCooperationProgramPage() {
    return (
        <View xPadding={false} gap main>
            <Post title="Sport sections and coaches">
                <>
                    <p>
                        Competition level at the world sports arena is constantly growing and is
                        setting strict requirements towards long-term build-up process of billiard
                        players. Also it specifies requirement to search and implement efficient
                        tools and methods of practicing which help streamline top results. Modern
                        trends of pool development demand that players master disciplined
                        fundamentals as well as are able to come up with proper tactical
                        decision-making in the heat of competition and under tough mental pressure.
                        Therefore one of most vital aspects of cue sports is the problem of
                        technical skills development.
                    </p>
                    <p>
                        We worked out objective, scientifically based and experimentally checked
                        criteria to evaluate technical skill level of billiard players. These
                        criteria enable players to discover reserves and determine potential for
                        further improvement.
                    </p>
                    <p>
                        Our server infrastructure allows for most efficient and unified storage of
                        players’ performance data in Big Data format. This enables analyzing their
                        change dynamics, which means more efficient planning of personal practice
                        approach to every student. Visualizing players’ progress.
                    </p>
                    <p>
                        We are ready to offer special terms of cooperation to sports sections and
                        coaches with groups of over five students. If you teach billiards we could
                        help you build comprehensive approach to tracking your group results,
                        performing control measurements and setting up more precise learning curve
                        for every student.
                    </p>
                    <p>
                        As an example please see{" "}
                        <LinkText pathTo="theory" text="experimental data" /> from teaching practice
                        of our partners.
                    </p>
                </>
            </Post>
            <Post title="Sports events organizers">
                <p>
                    We are interested in mutually beneficial cooperation with the events organizers.
                    You could hand the video recordings of the events over to us so that we process
                    them. Your participants could learn their objective performance data and check
                    themselves against acknowledged billiard masters.
                </p>
                <p>
                    With the help of our service your event would receive an extra promotion
                    channel. We provide a separate page for your event which can be accessed via:
                </p>

                <ul className="list-disc ml-10">
                    <li>special section at the main page;</li>
                    <li>events list;</li>
                    <li>past matches history at the players’ pages;</li>
                    <li>matches pages</li>
                </ul>

                <p>
                    Your event page will provide objective statistical data corresponding to the
                    skill level of the participants. You could issue a special award for most
                    skilled shot played, or recognize any other individual skill element that stands
                    out and was registered at your event. Statistical data and facts collected will
                    help promote your event and attract new participants.
                </p>
            </Post>
            <Post title="Billiard rooms">
                <p>
                    We are interested in mutually beneficial partnership with sports billiard room
                    owners. You will be able to offer visitors additional services like video
                    recordings analysis, progress tracking and personalized advice.
                </p>
                <p>
                    Implement our service cost to your room rates and receive additional profit from
                    advanced players. This offer could be more favorable to the players than
                    long-term service subscription due to one-time payment and flexible access. You
                    simply issue them coupons for your service upon pay-off.
                </p>
                <p>Install modern web cameras at your billiard tables to provide better service.</p>
            </Post>
            <Post title="For sponsors">
                <p>We can place your relevant advertising or branding on favorable terms</p>
            </Post>
        </View>
    );
}
