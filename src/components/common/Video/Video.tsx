import Link from "next/link";

export default function Video({ src, className = "" }: { src: string; className?: string }) {
    return (
        <video autoPlay muted loop className={`${className} rounded-2xl`}>
            <source src={src} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
            Sorry, your browser doesn't support embedded videos, but don't worry, you can
            <Link href={src}>download it</Link>
            and watch it with your favorite video player!
        </video>
    );
}
