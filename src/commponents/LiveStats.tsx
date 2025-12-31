import { useEffect, useRef, useState } from "react";
import { useRoundContext } from "./RoundProvider";
import VerticalDivider from "./VerticalDivider";
import {
    calculateAccuracy,
    calculateSpeed,
    formatDuration,
    liveDurationInSeconds,
} from "../helpers";
import InfoItem from "./InfoItem";

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
    const { status, mode, dispatch } = useRoundContext();
    const [time, setTime] = useState(0);
    const timerRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (status === "running") {
            timerRef.current = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [status]);

    useEffect(() => {
        if (mode === "passage") return;

        if (time >= 60) {
            dispatch({ type: "finish" });
        }
    }, [mode, time, dispatch]);

    return (
        <InfoItem
            name="Time"
            value={
                status === "not_started"
                    ? mode === "passage"
                        ? "0:00"
                        : "1:00"
                    : mode === "passage"
                      ? formatDuration(time)
                      : formatDuration(60 - time)
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
