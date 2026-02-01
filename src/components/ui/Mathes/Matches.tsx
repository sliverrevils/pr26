"use client";
import MathesList from "./MatchesList";
import MathesFilter from "./MatchFilters";
import { IMatchFilters, useMatchFilters } from "@/hooks/useMatchFilters";

export default function Matches({ searchParams }: { searchParams: IMatchFilters }) {
    const [filters, setFilters] = useMatchFilters();

    return (
        <div className="flex flex-col gap-8 ">
            <MathesFilter filters={filters} setFilters={setFilters} />
            <MathesList searchParams={searchParams} setFilters={setFilters} />
        </div>
    );
}
