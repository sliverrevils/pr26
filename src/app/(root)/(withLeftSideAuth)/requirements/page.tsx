import LinkText from "@/components/common/LinkText/LinkText";
import Post from "@/components/common/Post/Post";
import Video from "@/components/common/Video/Video";
import View from "@/components/common/View/View";
import Image from "next/image";
import Link from "next/link";

export default function RequirementsPage() {
    return (
        <View xPadding={false} main>
            <Post title="Public video requirements">
                <p>
                    The video records should be in HD quality. 9 foot table is required to be
                    recorded. Two players should be identified. We accept videos only from 2019,
                    2020, 2021 years. One video must contain only one match. It is not necessary
                    that all shots be filmed with a static camera, but at least one static view must
                    be in the video.
                </p>
                <Image
                    src={"/jpg/public_samples.jpg"}
                    width={830}
                    height={872}
                    alt="samples"
                    className="rounded-2xl"
                />
                <Link
                    href="https://www.youtube.com/watch?v=d4-VEbAHimk&list=PLNh_XWQ2EcmJyXBtLDvuhlxwM9q0WMUR4"
                    target="_blank"
                    className="text-f-green-main underline underline-offset-3"
                >
                    screenshot source
                </Link>
            </Post>
            <Post title="Private video requirements">
                <p>
                    The video records should be in HD quality at the very least, the table and all
                    of the pockets must be clearly visible. Video can be recorded with any
                    respective tool like smartphone, action camera or web camera. No special
                    lighting required. A recorded file can be uploaded directly or shared via a link
                    to the hosting service. <LinkText pathTo="howToRecord" text="At this page" />{" "}
                    you can get guidance on how to record a video and submit it.
                </p>
                <p>
                    In case the videos are uploaded to YouTube it is sufficient to turn on a
                    shareable link access. Also, one could create a private stream on YouTube and
                    send us a link when it is over. Only static recording from stationary fixed
                    position is allowed. Freehand recording won’t do — it is required to use a
                    support or a tripod. A video with partial visibility or zoomed out way too much
                    can be rejected by moderator.
                </p>
                <Image
                    alt=""
                    src="/jpg/private_samples.jpg"
                    width={830}
                    height={840}
                    className="rounded-2xl"
                />

                <Image
                    alt=""
                    src="/jpg/private_samples2.jpg"
                    width={830}
                    height={450}
                    className="rounded-2xl"
                />
            </Post>
            <Post title="Examples">
                <Video src="/video/example1_Trim.mp4" />
                <Video src="/video/exm2.mp4" />
            </Post>
        </View>
    );
}
