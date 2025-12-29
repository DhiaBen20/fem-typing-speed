export function calculateRealDuration(
    accumelatedDuration: number,
    resumedAt: number | null,
) {
    const untrackedDuration = resumedAt ? Date.now() - resumedAt : 0;

    return (accumelatedDuration + untrackedDuration) / 1000;
}

export function correctCharactersCount(input: string, mistakesCount: number) {
    return input.length >= mistakesCount ? input.length - mistakesCount : 0;
}

export function correctWordsCount(input: string, mistakesCount: number) {
    return correctCharactersCount(input, mistakesCount) / 5;
}

export function formatDuration(duration: number) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
