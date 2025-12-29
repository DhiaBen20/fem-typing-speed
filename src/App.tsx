import Header from "./commponents/Header";
import { useRoundContext } from "./commponents/RoundProvider";
import TypingPlayground from "./commponents/TypingPlayground";
import data from "./data.json";

function App() {
    const { status } = useRoundContext();

    return (
        <>
            <Header />
            <main className="mt-16">
                {status !== "completed" ? (
                    <TypingPlayground text={data["easy"][5].text} />
                ) : (
                    "results"
                )}
            </main>
        </>
    );
}

export default App;
