import LinkText from "@/components/common/LinkText/LinkText";
import Post from "@/components/common/Post/Post";
import Video from "@/components/common/Video/Video";
import View from "@/components/common/View/View";

export default function QuestionsPage() {
    return (
        <View xPadding={false} main>
            <Post title="How is our rating different from the Fargo Rate?">
                <p>
                    FargoRate rates pool players worldwide on the same scale based on games won and
                    lost against opponents of known rating. Our service caclulates absolute measure
                    of performance pocket billiard players based on AI video recognizing analytics.
                </p>
                <p>
                    As you can see, our rating has a fundamental difference. We can evaluate players
                    on a sufficient number of video materials, regardless of the presence or absence
                    of an opponent.
                </p>
            </Post>
        </View>
    );
}
