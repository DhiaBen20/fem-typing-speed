import Container from "./Container";
import LiveStats from "./LiveStats";
import RoundControls from "./RoundControlls";

export default function PlaygroundHeader() {
    return (
        <header>
            <Container>
                <div className="flex flex-col gap-y-5 xl:flex-row xl:justify-between xl:gap-y-0">
                    <LiveStats />
                    <RoundControls />
                </div>
                <div className="border-b border-[#262626] pb-4" />
            </Container>
        </header>
    );
}
