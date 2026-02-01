import { PATHES } from "@/config/pathes";
import { CircleCheckIco } from "@/icons/iconsSvg";
import Image from "next/image";
import Link from "next/link";

export default function RegisterNow() {
    return (
        <div
            className="w-full h-135  relative  bg-[#243b5a] overflow-hidden
            before:content-['']
            before:absolute
            before:inset-0
            before:bg-[#7c7bff]
            before:[clip-path:polygon(0_0,30%_0,70%_100%,0_100%)]
            flex
            justify-center
            items-center
            "
        >
            {/* <Image src={"/svg/regNowBg.svg"} width={1920} height={540} alt="bg" /> */}
            <div className="z-10 flex items-center gap-6">
                <Image
                    src={"/svg/registration-illustration.svg"}
                    width={393}
                    height={376}
                    alt="registration-illustration.svg"
                />
                <div className="max-w-113 text-white flex flex-col gap-5 items-start">
                    <div className=" font-extrabold text-4xl leading-12.25">
                        <span className="text-f-green-main">Register now</span> to activate such
                        features as:
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <CircleCheckIco />
                            <div>Community participation</div>
                        </div>
                        <div className="flex items-center gap-3">
                            <CircleCheckIco />
                            <div>Participation in the affiliate program</div>
                        </div>
                        <div className="flex items-center gap-3">
                            <CircleCheckIco />
                            <div>Suggested Videos Manager</div>
                        </div>
                    </div>
                    <Link
                        href={PATHES.signUp.path}
                        className="btn-40 bg-f-green-main/80 hover:bg-f-green-main transition shadow-2xl"
                    >
                        Registration
                    </Link>
                </div>
            </div>
        </div>
    );
}
