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
import confetti from "canvas-confetti";

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

        dispatch({ type: "set_best_wpm", payload: { value: speed } });

        localStorage.setItem("bestWPM", speed.toString());
    }, [bestWPM, dispatch, speed]);

    useEffect(() => {
        if (!lastBestSpeed || speed <= lastBestSpeed) return;

        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = {
            startVelocity: 30,
            spread: 360,
            ticks: 100,
            zIndex: 0,
        };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 40 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);
    }, [lastBestSpeed, speed]);

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
            <div className="flex flex-col gap-5 self-stretch md:flex-row md:self-center">
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
            <Button
                variant="secondary"
                onClick={() => dispatch({ type: "start_again" })}
            >
                {lastBestSpeed && speed > lastBestSpeed
                    ? "Beat this score"
                    : "go again"}
                <img src={tryAgain} alt="" className="brightness-0" />
            </Button>
        </Container>
    );
}
