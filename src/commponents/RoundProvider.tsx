import {
    createContext,
    useContext,
    useReducer,
    type ActionDispatch,
    type ReactNode,
} from "react";

type State = {
    status: "not_started" | "running" | "stopped" | "completed";
    input: string;
    resumedAt: number | null;
    duration: number;
    mistakesCount: number;
};

type Action =
    | { type: "start" }
    | { type: "stop" }
    | { type: "finish" }
    | { type: "update_input"; payload: { value: string } }
    | { type: "increment_mistake" };

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
    }
}

export default function RoundProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, {
        status: "not_started",
        input: "",
        resumedAt: null,
        duration: 0,
        mistakesCount: 0,
    });

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
