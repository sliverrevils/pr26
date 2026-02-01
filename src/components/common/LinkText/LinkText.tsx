import { PATHES } from "@/config/pathes";
import Link from "next/link";

type PathTo = keyof typeof PATHES;

export default function LinkText({ pathTo, text }: { pathTo: PathTo; text?: string }) {
    return (
        <Link href={PATHES[pathTo].path} className="text-f-green-main underline underline-offset-3">
            {text || PATHES[pathTo].title}
        </Link>
    );
}
