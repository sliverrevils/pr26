import Post from "@/components/common/Post/Post";
import View from "@/components/common/View/View";
import Image from "next/image";

export default function TheoryPage() {
    return (
        <View xPadding={false} main>
            <Post title="Experiment">
                <p>
                    Throughout a year the experiment was held in order to check certain criteria
                    evaluating technical skills of sports billiard players during preparation
                    process for their efficiency. For the purpose of experiment two groups of 8
                    players each were created (control group and experimental group).
                </p>
                <p>
                    Practice sessions within groups were run simultaneously according to PAT
                    training program and included standard drills and quarterly testing.
                    Additionally experimental group players were subject to regular evaluation of
                    technical skill (once per month) in accordance with set criteria. Then they
                    received special drills to develop certain skill elements. Total practice time
                    was the same for both groups, equal to 12 hours per week.
                </p>
                <p>Before the experiment players’ skill level was evaluated.</p>
                <p>
                    Players from experimental group scored more points in PAT 1 test as compared to
                    the players of control group.
                </p>
                <p>
                    The difference between groups before and after the experiment was as follows:
                    drill 1 – 6,29 mm / 38,08 mm, drill 2 – 4,87 mm / 40,99 mm; PAT 1 test results –
                    9 points / 72 points. Towards the end of the experiment the results of control /
                    experimental group changed in drill 1 by 11,22 mm / 55,59 mm, in drill 2 – by
                    13,35 mm / 59,21 mm; in PAT 1 test – by 51 points / 113 points.
                </p>
            </Post>
            <Post title="Results">
                <Image
                    src={"/png/e1.png"}
                    width={595}
                    height={520}
                    alt="e1"
                    className="self-center"
                />
                <Image
                    src={"/png/e2.png"}
                    width={595}
                    height={520}
                    alt="e1"
                    className="self-center"
                />
                <Image
                    src={"/png/e3.png"}
                    width={595}
                    height={520}
                    alt="e1"
                    className="self-center"
                />
                <p>
                    Before the experiment average results of control test for both groups were
                    pretty close. After the experiment both groups showed improvement, but
                    experimental group registered better progress, which is statistically verified.
                    The explanation for this is that players of the experimental group could receive
                    prompt information about their technical drawbacks and mistakes discovered,
                    including those that were hidden. Also players could counteract these drawbacks
                    through the use of practice drills.
                </p>
                <p>
                    The experiment proved the assumption that targeted use of special criteria to
                    evaluate the technical skill level of billiard athletes enables setting primary
                    areas and efficient management of technical development.
                </p>
            </Post>
        </View>
    );
}
