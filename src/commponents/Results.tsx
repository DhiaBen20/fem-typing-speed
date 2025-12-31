import clsx from "clsx";
import { useEffect, useState } from "react";
import completed from "../assets/images/icon-completed.svg";
import newPr from "../assets/images/icon-new-pb.svg";
import tryAgain from "../assets/images/icon-restart.svg";
import {
    calculateAccuracy,
    calculateSpeed,
    correctCharactersCount,
    durationInSeconds,
} from "../helpers";
import Button from "./button";
import Container from "./Container";
import { useRoundContext } from "./RoundProvider";

export default function Results() {
    const { input, mistakesCount, duration, bestWPM, dispatch } =
        useRoundContext();
    const [lastBestSpeed] = useState(bestWPM);

    const accuracy = calculateAccuracy(input, mistakesCount);
    const correctCharacters = correctCharactersCount(input, mistakesCount);
    const speed = calculateSpeed(
        input,
        mistakesCount,
        durationInSeconds(duration),
    );

    useEffect(() => {
        if (bestWPM && speed <= bestWPM) return;

        localStorage.setItem("bestWPM", speed.toString());
        dispatch({ type: "set_best_wpm", payload: { value: speed } });
    }, [bestWPM, dispatch, speed]);

    return (
        <Container className="flex flex-col items-center justify-center gap-8">
            {lastBestSpeed && speed > lastBestSpeed ? (
                <img src={newPr} alt="" />
            ) : (
                <img src={completed} alt="" />
            )}

            <div className="space-y-2.5 text-center">
                <h1 className="text-4xl font-bold text-white">
                    {!lastBestSpeed
                        ? "Baseline Established!"
                        : speed > lastBestSpeed
                          ? "High Score Smashed!"
                          : "Test Complete!"}
                </h1>
                <p className="text-xl text-[#949497]">
                    {!lastBestSpeed
                        ? "You’ve set the bar. Now the real challenge begins—time to beat it."
                        : speed > lastBestSpeed
                          ? "You’re getting faster. That was incredible typing."
                          : "Solid run. Keep pushing to beat your high score."}
                </p>
            </div>
            <div className="flex flex-col gap-5 md:flex-row self-stretch md:self-center">
                <div className="space-y-3 rounded-lg border border-[#3A3A3A] px-6 py-4 md:w-40">
                    <div className="text-xl text-[#949497]">WPM:</div>
                    <div className="text-2xl font-bold text-white">{speed}</div>
                </div>
                <div className="space-y-3 rounded-lg border border-[#3A3A3A] px-6 py-4 md:w-40">
                    <div className="text-xl text-[#949497]">Accuracy:</div>
                    <div
                        className={clsx("text-2xl font-bold", {
                            "text-[#D64D5B]": accuracy < 100,
                            "text-white": accuracy === 100,
                        })}
                    >
                        {accuracy}%
                    </div>
                </div>
                <div className="space-y-3 rounded-lg border border-[#3A3A3A] px-6 py-4 md:w-40">
                    <div className="text-xl text-[#949497]">Characters:</div>
                    <div className="text-2xl font-bold text-white">
                        <span className="text-[#4DD67B]">
                            {correctCharacters}
                        </span>
                        <span className="text-[#717178]">/</span>
                        <span className="text-[#D64D5B]">{mistakesCount}</span>
                    </div>
                </div>
            </div>
            <Button variant="secondary">
                Go again
                <img src={tryAgain} alt="" className="brightness-0" />
            </Button>
        </Container>
    );
}
