import clsx from "clsx";
import {
    useRef,
    useState,
    type ComponentProps,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from "react";
import Container from "./Container";
import Button from "./button";

function HiddenTextarea({
    ref,
    text,
    input,
    mistakesCount,
    setInput,
    setMistakesCount,
    onFinish,
    ...rest
}: {
    text: string;
    input: string;
    mistakesCount: number;
    setInput: Dispatch<SetStateAction<string>>;
    setMistakesCount: Dispatch<SetStateAction<number>>;
    onFinish: () => void;
} & ComponentProps<"textarea">) {
    return (
        <textarea
            {...rest}
            ref={ref}
            className="sr-only"
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

                // dont count mistakes when user removes input
                if (nextValue.length < input.length) return setInput(nextValue);

                const i = e.target.value.length - 1;

                if (text[i] !== e.target.value[i])
                    setMistakesCount(mistakesCount + 1);

                setInput(e.target.value);

                if (nextValue.length === text.length) onFinish();
            }}
        />
    );
}

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
            className={clsx("rounded", {
                "text-[#949497]": isRemaining,
                "bg-[#414141] text-[#949497]": isCurrent,
                "text-[#4DD67B]": isTyped && isCorrect,
                "text-[#D64D5B] underline": isTyped && !isCorrect,
            })}
        >
            {children}
        </span>
    );
}

export default function TextDisplay({ text }: { text: string }) {
    const [input, setInput] = useState("");
    const [mistakesCount, setMistakesCount] = useState(0);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [status, setStatus] = useState("not-started");

    return (
        <Container className="mt-8">
            <p className="text-white">{status}</p>
            <p className="text-white">{mistakesCount}</p>
            <div
                ref={containerRef}
                onPointerDown={(e) => {
                    if (
                        containerRef.current &&
                        e.target instanceof Node &&
                        containerRef.current.contains(e.target)
                    ) {
                        e.preventDefault();
                    }
                }}
            >
                <div className="relative">
                    <div
                        className={clsx(
                            "text-4xl leading-relaxed tracking-wide",
                            {
                                blur: !isFocused,
                            },
                        )}
                    >
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

                    {!isFocused && (
                        <div
                            onPointerDown={() => {
                                inputRef.current?.focus();
                            }}
                            className="absolute inset-0 flex flex-col items-center justify-center gap-5"
                        >
                            <Button
                                onClick={() => {
                                    if (inputRef.current) {
                                        inputRef.current.focus();
                                        setIsFocused(true);
                                    }
                                }}
                            >
                                Start Typing test
                            </Button>
                            <p className="text-xl font-semibold text-white">
                                Or click the text and start typing
                            </p>
                        </div>
                    )}
                </div>

                <HiddenTextarea
                    ref={inputRef}
                    text={text}
                    input={input}
                    mistakesCount={mistakesCount}
                    setInput={setInput}
                    setMistakesCount={setMistakesCount}
                    onFocus={() => {
                        setIsFocused(true);
                        setStatus("running");
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                        setStatus("stopped");
                    }}
                    onFinish={() => {
                        console.log("finish");
                        setStatus("finished");
                    }}
                />
            </div>
        </Container>
    );
}
