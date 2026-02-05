"use client";

import { IMatchFilters, IMatchFilterSet } from "@/hooks/useMatchFilters";
import { IMatchesSearch } from "@/mongo/models/matchSearchModel";
import { findFilteredMatches } from "@/services/matchSearchService";
import { useEffect, useEffectEvent, useRef, useState } from "react";

import { useScrollEndOnBody } from "@/hooks/useOnScrollEnd";
import { Match } from "@/components/ui/Match/Match";
import MatchSkeleton from "@/components/ui/Match/MatchSkeleton";
import { DevBlock } from "@/helpers/testHelpers";

//let searchParamsSnap: Partial<IMatchFilters> = {};

export default function MathesList({
    searchParams,
    setFilters,
}: {
    searchParams: IMatchFilters;
    setFilters: IMatchFilterSet;
}) {
    const searchParamsSnapRef = useRef<Partial<IMatchFilters>>({});
    const initRef = useRef(true);
    const [matches, setMatches] = useState<IMatchesSearch[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [isListEnd, setIsListEnd] = useState(false);

    useScrollEndOnBody(
        () => {
            loadMore();
        },
        500,
        isLoading || isListEnd || !matches.length,
    );

    const loadMore = useEffectEvent(async () => {
        setIsLoading(() => true);
        const newMatches = await findFilteredMatches({ searchParams, page });
        setMatches((state) =>
            newMatches.reduce<IMatchesSearch[]>(
                (acc, match) => (acc.find((i) => i._id === match._id) ? acc : [...acc, match]),
                state,
            ),
        );

        setPage((state) => state + 1);
        setIsLoading(() => false);
        setIsListEnd(() => newMatches.length < 10);
    });

    //TODO презепускается несколько раз , при выборе (попробовать перенести логику в loadMore, или без обновлений state)
    useEffect(() => {
        if (
            initRef.current ||
            JSON.stringify(searchParamsSnapRef.current) !== JSON.stringify(searchParams)
        ) {
            initRef.current = false;
            searchParamsSnapRef.current = searchParams;
            setPage(() => 1);
            setMatches(() => []);
            setIsListEnd(() => false);
            // process.nextTick(loadMore);
            loadMore();
        }
    }, [searchParams]);

    return (
        <div className="flex flex-col gap-4">
            <DevBlock>
                <div className="fixed top-1/2 left-9 text-2xl border p-2 rounded-2xl opacity-50">
                    <div>mathes : {matches.length}</div>
                    <div>next page : {page}</div>
                </div>
            </DevBlock>

            {matches.map((match) => (
                <Match key={match._id} match={match} linkedOponents={false} />
            ))}
            {!!!matches.length && !isLoading && (
                <div className="flex flex-col gap-5 items-center text-f-default animate-fade-in">
                    <div>no match found...</div>
                    <div
                        className="btn-blue-40"
                        onClick={() =>
                            setFilters({ country: "", game: "", player: "", playerSearch: "" })
                        }
                    >
                        Drop filters
                    </div>
                </div>
            )}
            {!isListEnd && <MatchSkeleton className="flex flex-col gap-4" count={3} />}
        </div>
    );
}
