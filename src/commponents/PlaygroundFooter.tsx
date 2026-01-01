import Button from "./button";
import Container from "./Container";
import restartIcon from "../assets/images/icon-restart.svg";
import { useRoundContext } from "./RoundProvider";

export default function PlaygroundFooter() {
    const { status, dispatch } = useRoundContext();

    return (
        status !== "not_started" && (
            <footer>
                <Container className="mt-16 text-center">
                    <div className="mb-8 border-b border-[#262626]" />

                    <Button
                        variant="secondary"
                        onClick={() => dispatch({ type: "start_again" })}
                    >
                        Restart Attempt
                        <img src={restartIcon} className="brightness-0" />
                    </Button>
                </Container>
            </footer>
        )
    );
}
