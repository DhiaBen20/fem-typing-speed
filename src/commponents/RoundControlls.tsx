import { useRoundContext } from "./RoundProvider";
import Select, { SelectItem, SelectSeparator } from "./Select";
import Toggle from "./Toggle";
import VerticalDivider from "./VerticalDivider";

export default function RoundControls() {
    const { difficulty, mode, status, dispatch } = useRoundContext();
    const disableControls = status !== "not_started";

    return (
        <>
            <div className="flex items-center gap-4 max-sm:hidden">
                <div className="inline-flex items-center gap-1.5">
                    <div className="text-[#949497]">Difficulty:</div>
                    {(["easy", "medium", "hard"] as const).map((level) => (
                        <Toggle
                            disabled={disableControls}
                            key={level}
                            onPressedChange={(p) => {
                                if (p) {
                                    dispatch({
                                        type: "set_difficulty",
                                        payload: { value: level },
                                    });
                                }
                            }}
                            pressed={level === difficulty}
                        >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </Toggle>
                    ))}
                </div>
                <VerticalDivider />
                <div className="inline-flex items-center gap-1.5">
                    <div className="text-[#949497]">Mode:</div>
                    {(["timed", "passage"] as const).map((modeOption) => (
                        <Toggle
                            disabled={disableControls}
                            key={modeOption}
                            onPressedChange={(p) => {
                                if (p) {
                                    dispatch({
                                        type: "set_mode",
                                        payload: { value: modeOption },
                                    });
                                }
                            }}
                            pressed={modeOption === mode}
                        >
                            {modeOption.charAt(0).toUpperCase() +
                                modeOption.slice(1)}
                            {modeOption === "timed" ? " (60s)" : ""}
                        </Toggle>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:hidden">
                <Select
                    disabled={disableControls}
                    value={difficulty}
                    onValueChange={(v) =>
                        dispatch({
                            type: "set_difficulty",
                            payload: { value: v as typeof difficulty },
                        })
                    }
                >
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectSeparator />
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectSeparator />
                    <SelectItem value="hard">Hard</SelectItem>
                </Select>

                <Select
                    disabled={disableControls}
                    value={mode}
                    onValueChange={(v) =>
                        dispatch({
                            type: "set_mode",
                            payload: { value: v as typeof mode },
                        })
                    }
                >
                    <SelectItem value="timed">Timed (60s)</SelectItem>
                    <SelectSeparator />
                    <SelectItem value="passage">Passage</SelectItem>
                </Select>
            </div>
        </>
    );
}
