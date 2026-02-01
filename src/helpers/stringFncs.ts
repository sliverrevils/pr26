export function capitalizeWords(value: string): string {
    let result = value.slice(0, 40);
    result = result.replace(/[^a-zA-Zа-яА-ЯёЁ .-]+/g, "");
    result = result.replace(/ {2,}/g, " ");
    result = result.toLowerCase();
    result = result.replace(/(^|[ -])([a-zA-Zа-яА-ЯёЁ])/g, (_, sep, char) => {
        return sep + char.toUpperCase();
    });
    return result;
}

export const truncateText = (text: string, max: number): string => {
    if (text.length <= max) return text;
    return text.slice(0, max) + "…";
};
