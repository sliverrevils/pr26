"use client";

import Image from "next/image";

type FlagProps = {
    code: string; // ru, ua, jp, us
    className?: string;
    sizeBig?: boolean;
};

export const Flag: React.FC<FlagProps> = ({ code, sizeBig = false, className }) => {
    return (
        <Image
            src={`/svg/flags/${sizeBig ? "4x3" : "1x1"}/${code.toLowerCase()}.svg`}
            className={className}
            width={20}
            height={10}
            alt={code}
        />
    );
};
