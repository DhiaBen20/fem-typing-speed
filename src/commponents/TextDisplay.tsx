import clsx from "clsx";
import { useState, type ReactNode } from "react";
import Container from "./Container";

function Character({
    isRemaining,
    isTyped,
    isCurrent,
    isCorrect,
    children,
}: {
    isRemaining: boolean;
    isTyped: boolean;
    isCurrent: boolean;
    isCorrect: boolean;
    children: ReactNode;
}) {
    return (
        <span
            className={clsx({
                "text-white": isRemaining,
                "bg-neutral-700": isCurrent,
                "text-green-600": isTyped && isCorrect,
                "text-red-600 underline": isTyped && !isCorrect,
            })}
        >
            {children}
        </span>
    );
}

export default function TextDisplay({ text }: { text: string }) {
    const [input, setInput] = useState("");
    const [mistakesCount, setMistakesCount] = useState(0);

    return (
        <Container>
            <div className="text-white">
                <div className="text-xl leading-relaxed tracking-wide text-white">
                    {text.split("").map((c, i) => (
                        <Character
                            key={i}
                            isRemaining={i > input.length}
                            isTyped={i < input.length}
                            isCurrent={i === input.length}
                            isCorrect={input[i] === c}
                        >
                            {c}
                        </Character>
                    ))}
                </div>
                <p>{mistakesCount} mistakes</p>
                <textarea
                    className="w-full rounded-2xl border p-3"
                    value={input}
                    rows={5}
                    onKeyDown={(e) => {
                        if (e.target instanceof HTMLTextAreaElement) {
                            const l = e.target.value.length;
                            e.target.setSelectionRange(l, l);
                        }
                    }}
                    onChange={(e) => {
                        const nextValue = e.target.value;

                        if (nextValue.length > text.length) return;

                        if (nextValue.length < input.length)
                            return setInput(nextValue);

                        const i = e.target.value.length - 1;

                        if (text[i] !== e.target.value[i])
                            setMistakesCount(mistakesCount + 1);

                        setInput(e.target.value);
                    }}
                />
            </div>
        </Container>
    );
}
