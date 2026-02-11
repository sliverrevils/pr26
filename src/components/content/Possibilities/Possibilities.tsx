import Image from "next/image";
import ContentLine from "../../common/ContentLine/ContentLine";

const ServiceCards = [
    {
        icon: "/svg/capability_track.svg",
        title: "Players development tracking",
        description: "Tracking players performance data change dynamics over a certain period.",
    },
    {
        icon: "/svg/capability_view.svg",
        title: "Players performance view",
        description:
            "Players pages offer access to basic performance data which describe the level and style of a player.",
    },
    {
        icon: "/svg/capability_compare.svg",
        title: "Compare",
        description: "Compare players performance data and playing style.",
    },
    {
        icon: "/svg/capability_plan.svg",
        title: "Identifying growth areas",
        description:
            "Focus the practice sessions on proper areas and increase overall level of play more efficiently.",
    },
    {
        icon: "/svg/capability_search.svg",
        title: "Search players",
        description:
            "Quality and up-to-date database of real players, continuously updated and moderated.",
    },
    {
        icon: "/svg/capability_analytics.svg",
        title: "Matches analysis",
        description:
            "Players’ individual performance comparison and shots stats analysis through a certain match.",
    },
];

export default function Possibilities() {
    return (
        <div className="container self-center  flex flex-col">
            <ContentLine
                imgUrl="/svg/technican-checkmarked.svg"
                textGray="Service"
                textBlue="possibilities"
                about="We combine AI with computer vision technologies for automatic processing and
                analysis of billiard videos.  We collect only open and publicly available video data
                for analyzing."
            />
            <div
                className="grid grid-cols-1 gap-4 
                            md:grid-cols-2
                            lg:grid-cols-3
                            "
            >
                {ServiceCards.map(Service)}
            </div>
        </div>
    );
}

const Service = ({ icon, title, description }: (typeof ServiceCards)[1]) => (
    <div key={icon} className="bg-f-gray-4 h-87.5 rounded-2xl flex justify-center  p-5 pt-12.5">
        <div className="flex flex-col items-center gap-2.5">
            <Image src={icon} width={120} height={120} alt={title} />
            <div className="text-[20px] font-extrabold text-f-default max-w-3xs text-center">
                {title}
            </div>
            <div className="text-base font-semibold text-f-default max-w-3xs text-center">
                {description}
            </div>
        </div>
    </div>
);
