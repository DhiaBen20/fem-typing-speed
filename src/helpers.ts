export function correctCharactersCount(input: string, mistakesCount: number) {
    return input.length >= mistakesCount ? input.length - mistakesCount : 0;
}

function correctWordsCount(input: string, mistakesCount: number) {
    return correctCharactersCount(input, mistakesCount) / 5;
}

export function formatDuration(duration: number) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function durationInSeconds(durationInMs: number) {
    return Math.floor(durationInMs / 1000);
}

export function liveDurationInSeconds(
    durationMs: number,
    resumedAt: number | null,
) {
    const untrackedDuration = resumedAt ? Date.now() - resumedAt : 0;

    return durationInSeconds(durationMs + untrackedDuration);
}

export function calculateAccuracy(input: string, mistakes: number) {
    return input.length
        ? Math.round(
              (correctCharactersCount(input, mistakes) / input.length) * 100,
          )
        : 100;
}

export function calculateSpeed(
    input: string,
    mistakes: number,
    durationInSecs: number,
) {
    if (durationInSecs === 0) {
        return 0;
    }

    return Math.round(
        correctWordsCount(input, mistakes) / (durationInSecs / 60),
    );
}
