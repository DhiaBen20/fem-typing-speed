import clsx from "clsx";
import {
    useRef,
    useState,
    type ComponentProps,
    type Dispatch,
    type RefObject,
    type SetStateAction,
} from "react";
import Button from "./button";
import Container from "./Container";
import PlaygroundHeader from "./PlaygroundHeader";
import { useRoundContext } from "./RoundProvider";

function HiddenInput({
    ref,
    text,
    input,
    setInput,
    onFinish,
    onMistake,
    ...rest
}: {
    text: string;
    input: string;
    setInput: (value: string) => void;
    onFinish: () => void;
    onMistake: () => void;
} & ComponentProps<"input">) {
    return (
        <input
            type="text"
            {...rest}
            ref={ref}
            className="sr-only"
            value={input}
            onKeyDown={(e) => {
                if (e.target instanceof HTMLInputElement) {
                    const l = e.target.value.length;
                    e.target.setSelectionRange(l, l);
                }
            }}
            onChange={(e) => {
                const nextValue = e.target.value;

                // dont accept user input when he finish the text
                if (nextValue.length > text.length) return;

                // dont count mistakes when user removes input
                if (nextValue.length < input.length) return setInput(nextValue);

                const i = e.target.value.length - 1;
                if (text[i] !== e.target.value[i]) onMistake();
                if (nextValue.length === text.length) onFinish();
                setInput(e.target.value);
            }}
        />
    );
}

function Character({
    isRemaining,
    isTyped,
    isCurrent,
    isCorrect,
    value,
}: {
    isRemaining: boolean;
    isTyped: boolean;
    isCurrent: boolean;
    isCorrect: boolean;
    value: string;
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
            {value}
        </span>
    );
}

function TextDisplay({
    text,
    input,
    isFocused,
}: {
    text: string;
    input: string;
    isFocused: boolean;
}) {
    return (
        <div
            className={clsx(
                "h-[calc(2*58.5px)]x overflow-hidden text-4xl leading-relaxed tracking-wide",
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
                    value={c}
                />
            ))}
        </div>
    );
}

function Overlay({
    inputRef,
    setIsFocused,
}: {
    inputRef: RefObject<HTMLInputElement | null>;
    setIsFocused: Dispatch<SetStateAction<boolean>>;
}) {
    return (
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
    );
}

export default function TypingPlayground({ text }: { text: string }) {
    const { input, dispatch } = useRoundContext();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <>
            <PlaygroundHeader />

            <Container
                onPointerDown={(e) => {
                    if (
                        e.target instanceof Node &&
                        e.currentTarget.contains(e.target)
                    ) {
                        e.preventDefault();
                    }
                }}
                className="mt-8"
            >
                <div className={"relative"}>
                    <TextDisplay
                        isFocused={isFocused}
                        input={input}
                        text={text}
                    />
                    {!isFocused && (
                        <Overlay
                            inputRef={inputRef}
                            setIsFocused={setIsFocused}
                        />
                    )}
                </div>

                <HiddenInput
                    ref={inputRef}
                    text={text}
                    input={input}
                    setInput={(input: string) =>
                        dispatch({
                            type: "update_input",
                            payload: { value: input },
                        })
                    }
                    onFocus={() => {
                        setIsFocused(true);
                        dispatch({ type: "start" });
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                        dispatch({ type: "stop" });
                    }}
                    onMistake={() => dispatch({ type: "increment_mistake" })}
                    onFinish={() => {
                        dispatch({ type: "finish" });
                    }}
                />
            </Container>
        </>
    );
}
