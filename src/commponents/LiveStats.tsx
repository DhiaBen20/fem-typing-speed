import { useEffect, useRef, useState } from "react";
import {
    calculateRealDuration,
    correctCharactersCount,
    correctWordsCount,
    formatDuration,
} from "../helpers";
import InfoItem from "./InfoItem";
import { useRoundContext } from "./RoundProvider";
import VerticalDivider from "./VerticalDivider";

function Speed() {
    const { input, mistakesCount, duration, resumedAt } = useRoundContext();

    const correctWords = correctWordsCount(input, mistakesCount);
    const durationInMins = calculateRealDuration(duration, resumedAt) / 60;

    return (
        <InfoItem
            name="WPM"
            value={Math.round(correctWords / durationInMins) || 0}
        />
    );
}

function Accuracy() {
    const { input, mistakesCount } = useRoundContext();

    const accuracy = Math.round(
        (correctCharactersCount(input, mistakesCount) / input.length) * 100,
    );

    return (
        <InfoItem
            name="Accuracy"
            color={accuracy === 100 || isNaN(accuracy) ? "white" : "red"}
            value={(isNaN(accuracy) ? 100 : accuracy) + "%"}
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
