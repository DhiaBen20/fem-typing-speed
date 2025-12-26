import { useState } from "react";
import Container from "./commponents/Container";
import Header from "./commponents/Header";
import LiveStats from "./commponents/LiveStats";
import RoundControls from "./commponents/RoundControlls";
import data from "./data.json";
import TextDisplay from "./commponents/TextDisplay";

function App() {
    const [difficulty, setDifficulty] = useState("easy");
    const [mode, setMode] = useState("timed");

    return (
        <>
            <Header />

            <main className="mt-16">
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

                <TextDisplay text={data["hard"][5].text} />
            </main>
        </>
    );
}

export default App;
