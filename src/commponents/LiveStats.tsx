import { useEffect, useState } from "react";
import {
    calculateAccuracy,
    calculateSpeed,
    formatDuration,
    liveDurationInSeconds,
} from "../helpers";
import InfoItem from "./InfoItem";
import { useRoundContext } from "./RoundProvider";
import VerticalDivider from "./VerticalDivider";

function Speed() {
    const { input, mistakesCount, duration, resumedAt } = useRoundContext();

    return (
        <InfoItem
            name="WPM"
            value={calculateSpeed(
                input,
                mistakesCount,
                liveDurationInSeconds(duration, resumedAt),
            )}
        />
    );
}

function Accuracy() {
    const { input, mistakesCount } = useRoundContext();

    const accuracy = calculateAccuracy(input, mistakesCount);

    return (
        <InfoItem
            name="Accuracy"
            color={accuracy === 100 ? "white" : "red"}
            value={accuracy + "%"}
        />
    );
}

function Time() {
    const { status, mode, duration, resumedAt, dispatch } = useRoundContext();
    const [, forceUpdate] = useState(0);

    const liveDuration = liveDurationInSeconds(duration, resumedAt);
    
    useEffect(() => {
        if (resumedAt === null) return;
        let interval: number;

        if (status === "running") {
            interval = setInterval(() => {
                forceUpdate((n) => n + 1);
            }, 500);
        }

        return () => clearInterval(interval);
    }, [resumedAt, status]);

    useEffect(() => {
        if (mode === "passage") return;

        if (liveDuration >= 60) {
            dispatch({ type: "finish" });
        }
    }, [mode, liveDuration, dispatch]);

    return (
        <InfoItem
            name="Time"
            value={
                status === "not_started"
                    ? mode === "passage"
                        ? "0:00"
                        : "1:00"
                    : mode === "passage"
                      ? formatDuration(liveDuration)
                      : formatDuration(60 - liveDuration)
            }
            color={status === "not_started" ? "white" : "yellow"}
        />
    );
}

export default function LiveStats() {
    return (
        <div className="inline-flex items-center gap-4 text-white">
            <Speed />
            <VerticalDivider />
            <Accuracy />
            <VerticalDivider />
            <Time />
        </div>
    );
}
