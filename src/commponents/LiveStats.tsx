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

    return <InfoItem name="Accuracy" value={(accuracy || 0) + "%"} />;
}

function Time() {
    const { status } = useRoundContext();
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

    return (
        <InfoItem
            name="Time"
            value={status !== "not_started" ? formatDuration(time) : "0:60"}
            color="yellow"
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
