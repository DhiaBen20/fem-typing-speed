import Header from "./commponents/Header";
import Results from "./commponents/Results";
import { useRoundContext } from "./commponents/RoundProvider";
import TypingPlayground from "./commponents/TypingPlayground";

function App() {
    const { status } = useRoundContext();

    return (
        <>
            <Header />
            <main className="mt-16">
                {status !== "completed" ? <TypingPlayground /> : <Results />}
            </main>
        </>
    );
}

export default App;
