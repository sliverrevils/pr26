import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";

export type IMatchFilters = {
    player: string;
    playerSearch: string;
    country: string;
    game: string;
    // page: string;
};
export type IMatchFilterSet = (prop: Partial<Record<keyof IMatchFilters, string>>) => void;
const parsers = {
    player: parseAsString.withDefault(""),
    playerSearch: parseAsString.withDefault(""),
    country: parseAsString.withDefault(""),
    game: parseAsString.withDefault(""),
    // page: parseAsString.withDefault(""),
};
export function useMatchFilters() {
    return useQueryStates(parsers, { shallow: false, history: "push" });
}
