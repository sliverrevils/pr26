import LinkText from "@/components/common/LinkText/LinkText";
import Post from "@/components/common/Post/Post";
import View from "@/components/common/View/View";
import Image from "next/image";

export default function HowToRecordPage() {
    return (
        <View main xPadding={false}>
            <Post title="How to record and submit a video">
                <p>
                    There are two completely different ways to approach this matter in a comfortable
                    way: either via online feed or offline recording. First way requires a stable
                    quality Internet connection, preferably through Wi-Fi. All you need is a YouTube
                    account where you could start a live feed. After your practice session is
                    finished you also finish the live feed. Then copy the link to the recorded feed
                    and paste it to the form we provide to accept the video. Great advantage of
                    going this way is no need to edit the video and no worries about sufficient free
                    space on your device. The drawback is a need for a good Internet connection and
                    a power supply for your device. A smartphone battery drains quickly in live feed
                    mode, and a laptop equipped with a camera requires a power supply source. Also,
                    your device should be smart enough to be able to provide a live feed.
                </p>
                <p>
                    Another way to go is an offline video recording of your practice sessions. It is
                    more standalone and portable approach. One video recording device is sufficient,
                    like a smartphone or a simple action camera. The device should have enough
                    storage space to record several hours of video in HD quality and is not required
                    to be too smart. Usually 32 Gb of storage is enough to fit about 5 hours of
                    practice. We recommend you take care of additionally charging the device with
                    the use of a power bank. Main drawback of this approach is a need to do your
                    “home work” of transferring the files from your device to the computer. Some
                    recording devices may require compiling multiple parts into a single record.
                    Once your recorded video is ready, the files should be sent to your YouTube
                    account and the link should be inserted into the form we provide to accept the
                    video.
                </p>
                <p>
                    Whichever approach you choose, by no means you could do without a steady support
                    for the recording device, be it a tripod, a monopod or a selfie stick. The
                    recording should be done in one stationary view. The higher the camera is in
                    relation to the pool table, the better is the view. It is important to prevent
                    occasional movements of the camera, otherwise a part of the pool table might not
                    get recorded. If that happens, part of your practice session will turn out as
                    faulty. In such case we recommend you start the recording over. Get more
                    information on requirements to the videos{" "}
                    <LinkText pathTo="requirements" text="at this page" /> .
                </p>

                <table className="w-full border border-f-gray-5 outline-1 outline-f-gray-5 rounded-2xl overflow-hidden border-collapse">
                    <thead className="bg-f-gray-4">
                        <tr>
                            <th className="border border-f-gray-5 px-4 py-2 text-left"></th>
                            <th className="border border-f-gray-5 px-4 py-2 text-center">Device</th>
                            <th className="border border-f-gray-5 px-4 py-2 text-center">
                                Home work
                            </th>
                            <th className="border border-f-gray-5 px-4 py-2 text-center">
                                Storage
                            </th>
                            <th className="border border-f-gray-5 px-4 py-2 text-center">
                                Internet
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-f-gray-5 px-4 py-2 font-semibold">
                                Live feed
                            </td>
                            <td className="border border-f-gray-5 px-4 py-2 ">
                                Smartphone, laptop + web camera
                            </td>
                            <td className="border border-f-gray-5 px-4 py-2 text-center ">-</td>
                            <td className="border border-f-gray-5 px-4 py-2 text-center">-</td>
                            <td className="border border-f-gray-5 px-4 py-2 text-center">+</td>
                        </tr>
                        <tr>
                            <td className="border border-f-gray-5 px-4 py-2 font-semibold">
                                Recording
                            </td>
                            <td className="border border-f-gray-5 px-4 py-2">
                                Action camera, Laptop + web camera, Smartphone
                            </td>
                            <td className="border border-f-gray-5 px-4 py-2 text-center">+</td>
                            <td className="border border-f-gray-5 px-4 py-2 text-center">+</td>
                            <td className="border border-f-gray-5 px-4 py-2 text-center">-</td>
                        </tr>
                    </tbody>
                </table>
                <Image alt="" src="/jpg/monopod.jpg" width={266} height={380} />
                <Image alt="" src="/jpg/selfy.jpg" width={266} height={380} />
                <Image alt="" src="/jpg/tripod.jpg" width={266} height={380} />
            </Post>
        </View>
    );
}
