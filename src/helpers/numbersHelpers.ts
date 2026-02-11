export function roundNumber(num: number): number {
    if (Number.isInteger(num)) return num;
    return Math.floor(num * 100) / 100;
}

export function shotToPercent(x: number): number {
    return ((x + 1) / 2) * 100;
}
