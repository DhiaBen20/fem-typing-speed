import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    type ActionDispatch,
    type ReactNode,
} from "react";
import data from "../data.json";

type State = {
    status: "not_started" | "running" | "stopped" | "completed";
    practiceText: string;
    input: string;
    resumedAt: number | null;
    duration: number;
    mistakesCount: number;
    difficulty: "easy" | "medium" | "hard";
    mode: "timed" | "passage";
    bestWPM: null | number;
};

type Action =
    | { type: "start" }
    | { type: "stop" }
    | { type: "finish" }
    | { type: "update_input"; payload: { value: string } }
    | { type: "increment_mistake" }
    | { type: "set_difficulty"; payload: { value: State["difficulty"] } }
    | { type: "set_mode"; payload: { value: State["mode"] } }
    | { type: "set_practice_text"; payload: { value: State["practiceText"] } }
    | {
          type: "set_best_wpm";
          payload: { value: NonNullable<State["bestWPM"]> };
      }
    | { type: "start_again" };

const RoundContext = createContext<
    (State & { dispatch: ActionDispatch<[Action]> }) | null
>(null);

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "start":
            return {
                ...state,
                status: "running",
                resumedAt: Date.now(),
            };
        case "stop":
            return {
                ...state,
                status: "stopped",
                duration: state.duration + (Date.now() - state.resumedAt!),
            };
        case "finish":
            return {
                ...state,
                status: "completed",
                duration: state.duration + (Date.now() - state.resumedAt!),
            };
        case "increment_mistake":
            return {
                ...state,
                mistakesCount: state.mistakesCount + 1,
            };
        case "update_input":
            return {
                ...state,
                input: action.payload.value,
            };
        case "set_difficulty":
            return {
                ...state,
                difficulty: action.payload.value,
            };
        case "set_mode":
            return {
                ...state,
                mode: action.payload.value,
            };
        case "set_practice_text":
            return {
                ...state,
                practiceText: action.payload.value,
            };
        case "set_best_wpm":
            return {
                ...state,
                bestWPM: action.payload.value,
            };
        case "start_again":
            return {
                ...state,
                status: "not_started",
                input: "",
                mistakesCount: 0,
                duration: 0,
                resumedAt: null,
            };
    }
}

export default function RoundProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, {
        status: "not_started",
        practiceText: "",
        input: "",
        resumedAt: null,
        duration: 0,
        mistakesCount: 0,
        bestWPM: null,
        mode: "timed",
        difficulty: "easy",
    });

    useEffect(() => {
        const bestWPM = localStorage.getItem("bestWPM");

        if (bestWPM) {
            dispatch({
                type: "set_best_wpm",
                payload: { value: JSON.parse(bestWPM) },
            });
        }
    }, []);

    useEffect(() => {
        dispatch({
            type: "set_practice_text",
            payload: {
                value: data[state.difficulty][Math.floor(Math.random() * 10)]
                    .text,
            },
        });
    }, [dispatch, state.difficulty]);

    return (
        <RoundContext value={{ ...state, dispatch }}>{children}</RoundContext>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRoundContext() {
    const context = useContext(RoundContext);

    if (!context) {
        throw new Error("useRoundContext must be used within a RoundProvider");
    }

    return context;
}
