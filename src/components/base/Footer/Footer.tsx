import FooterMenu from "@/components/menus/FooterMenu/FooterMenu";
import {
    EmailSvg,
    FaceBookSvg,
    InstagramSvg,
    LinkedInSvg,
    LogoFooterSvg,
    TelegramSvg,
    TikTokSvg,
    YoutubeSvg,
} from "@/icons/iconsSvg";

export default function Footer() {
    return (
        <div className="bg-f-footer flex justify-center">
            <footer className="container flex flex-col pt-10 lg:pt-24">
                <div
                    className="flex flex-col  mb-15 gap-5
                                lg:flex-row lg:gap-2 
                                "
                >
                    <div className="flex flex-col px-2.5 gap-y-6 flex-1">
                        <LogoFooterSvg />
                        <div className="text-white/50 text-[15px] w-51">
                            We provide every billiard player a personal dashboard evaluating their
                            level and skill dynamics
                        </div>

                        <div className="flex gap-0.5 items-center">
                            <a
                                href="https://www.youtube.com/channel/UCoagVPt3t16t20vSzdkMsag"
                                target="_blank"
                            >
                                <YoutubeSvg />
                            </a>
                            <a href="https://www.facebook.com/PerformStars" target="_blank">
                                <FaceBookSvg />
                            </a>
                            <a href="https://www.instagram.com/performstarscom/" target="_blank">
                                <InstagramSvg />
                            </a>
                            <a href="https://www.tiktok.com/@performstars" target="_blank">
                                <TikTokSvg />
                            </a>
                            <a href="https://www.linkedin.com/groups/14190912/" target="_blank">
                                <LinkedInSvg />
                            </a>
                            <a href="https://t.me/performstars" target="_blank">
                                <TelegramSvg />
                            </a>
                            <a href="mailto:info@performstars.com" target="_blank">
                                <EmailSvg />
                            </a>
                        </div>
                    </div>

                    <FooterMenu
                        className="flex flex-col gap-4 justify-around w-full flex-1 p-4
                                            md:flex-row 
                                            "
                    />
                </div>
                <div className="border-b border-white/20 "></div>
                <div className="text-center text-white/50 text-[13px] my-7.5">
                    © 2020 - {new Date().getFullYear()} Performstars.com
                </div>
            </footer>
        </div>
    );
}
