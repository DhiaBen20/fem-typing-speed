import Container from "./commponents/Container";
import Header from "./commponents/Header";
import LiveStats from "./commponents/LiveStats";
import RoundControls from "./commponents/RoundControlls";
function App() {
    return (
        <>
            <Header />

            <main className="mt-16">
                <header>
                    <Container>
                        <div className="flex flex-col gap-y-5 xl:flex-row xl:justify-between xl:gap-y-0">
                            <LiveStats />
                            <RoundControls />
                        </div>
                        <div className="pb-4 border-b border-[#262626]"/>
                    </Container>
                </header>
            </main>
        </>
    );
}

export default App;
