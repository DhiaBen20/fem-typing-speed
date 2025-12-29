import { useState } from "react";
import Container from "./Container";
import LiveStats from "./LiveStats";
import RoundControls from "./RoundControlls";

export default function PlaygroundHeader() {
    const [difficulty, setDifficulty] = useState("easy");
    const [mode, setMode] = useState("timed");

    return (
        <header>
            <Container>
                <div className="flex flex-col gap-y-5 xl:flex-row xl:justify-between xl:gap-y-0">
                    <LiveStats />
                    <RoundControls
                        difficulty={difficulty}
                        setDifficulty={setDifficulty}
                        mode={mode}
                        setMode={setMode}
                    />
                </div>
                <div className="border-b border-[#262626] pb-4" />
            </Container>
        </header>
    );
}
