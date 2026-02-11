"use client";

import { Flag } from "@/components/common/Flag/Flag";
import Input from "@/components/common/Input/Input";
import Select from "@/components/common/Select/Select";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { countries } from "@/constants/countres";
import { IMatchFilters, IMatchFilterSet, useMatchFilters } from "@/hooks/useMatchFilters";
import { IPlayer } from "@/mongo/models/playerModel";
import { IPlayerSearch } from "@/mongo/models/playersSearchModel";
import { findTopPlayers } from "@/services/playerService";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function MathesFilter({
    filters,
    setFilters,
}: {
    filters: IMatchFilters;
    setFilters: IMatchFilterSet;
}) {
    const player = filters.player || "";
    // const playerSearch = filters.playerSearch || "";
    const country = filters.country || "";
    const game = filters.game || "";

    const [topPlayers, setTopPlayer] = useState<IPlayerSearch[]>([]);
    const [search, setSearch] = useState("");

    const [debouncedSearch] = useDebounce(search, 300);
    useEffect(() => {
        setFilters({ playerSearch: debouncedSearch });
    }, [debouncedSearch]);

    useEffect(() => {
        findTopPlayers().then(setTopPlayer);
    }, []);
    return (
        <div className=" grid grid-cols-2 gap-4">
            <Select
                value={player}
                onChange={(value) => {
                    console.log(value);
                    setFilters({ player: value });
                }}
                onDropSelect={() => setFilters({ player: "" })}
                options={topPlayers.map((player) => ({
                    label: player.name,
                    value: player.playerId,
                    icon: <Avatar human={player} size="small" showCorona={false} />,
                }))}
                title="Player"
                placeholder="select from top players"
            />
            <Input
                title="Search for all players"
                value={search}
                onChange={({ target: { value } }) => {
                    setSearch(value);
                }}
                placeholder="Search player"
            />
            <Select
                value={country}
                onChange={(value) => setFilters({ country: value })}
                onDropSelect={() => setFilters({ country: "" })}
                options={countries.map(({ code, country }) => ({
                    value: code,
                    label: country,
                    icon: <Flag code={code} className="rounded-sm" />,
                }))}
                title="Country"
                placeholder="event country"
            />
            <Select
                value={game}
                onChange={(value) => setFilters({ game: value })}
                onDropSelect={() => setFilters({ game: "" })}
                options={[
                    { value: "8", label: "8" },
                    { value: "9", label: "9" },
                    { value: "10", label: "10" },
                    { value: "pool", label: "pool" },
                ]}
                title="Game"
                placeholder="select game"
            />
        </div>
    );
}
