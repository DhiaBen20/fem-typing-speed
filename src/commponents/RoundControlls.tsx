import { type Dispatch, type SetStateAction } from "react";
import Select, { SelectItem, SelectSeparator } from "./Select";
import Toggle from "./Toggle";
import VerticalDivider from "./VerticalDivider";

export default function RoundControls({
    difficulty,
    setDifficulty,
    mode,
    setMode,
}: {
    difficulty: string;
    mode: string;
    setDifficulty: Dispatch<SetStateAction<string>>;
    setMode: Dispatch<SetStateAction<string>>;
}) {
    return (
        <>
            <div className="flex items-center gap-4 max-sm:hidden">
                <div className="inline-flex items-center gap-1.5">
                    <div className="text-[#949497]">Difficulty:</div>
                    <Toggle
                        onPressedChange={(p) =>
                            setDifficulty((v) => (p ? "easy" : v))
                        }
                        pressed={"easy" === difficulty}
                    >
                        Easy
                    </Toggle>
                    <Toggle
                        onPressedChange={(p) =>
                            setDifficulty((v) => (p ? "medium" : v))
                        }
                        pressed={"medium" === difficulty}
                    >
                        Medium
                    </Toggle>
                    <Toggle
                        onPressedChange={(p) =>
                            setDifficulty((v) => (p ? "hard" : v))
                        }
                        pressed={"hard" === difficulty}
                    >
                        Hard
                    </Toggle>
                </div>
                <VerticalDivider />
                <div className="inline-flex items-center gap-1.5">
                    <div className="text-[#949497]">Mode:</div>
                    <Toggle
                        onPressedChange={(p) =>
                            setMode((v) => (p ? "timed" : v))
                        }
                        pressed={"timed" === mode}
                    >
                        Timed (60s)
                    </Toggle>
                    <Toggle
                        onPressedChange={(p) =>
                            setMode((v) => (p ? "passage" : v))
                        }
                        pressed={"passage" === mode}
                    >
                        Passage
                    </Toggle>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:hidden">
                <Select
                    value={difficulty}
                    onValueChange={(v) => setDifficulty(v)}
                >
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectSeparator />
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectSeparator />
                    <SelectItem value="hard">Hard</SelectItem>
                </Select>

                <Select value={mode} onValueChange={(v) => setMode(v)}>
                    <SelectItem value="timed">Timed (60s)</SelectItem>
                    <SelectSeparator />
                    <SelectItem value="passage">Passage</SelectItem>
                </Select>
            </div>
        </>
    );
}
