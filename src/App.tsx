import Button from "./commponents/button";
import Container from "./commponents/Container";
import Header from "./commponents/Header";
import InfoItem from "./commponents/InfoItem";
import Select, { SelectItem, SelectSeparator } from "./commponents/Select";
import Toggle from "./commponents/Toggle";
import VerticalDivider from "./commponents/VerticalDivider";
function App() {
    return (
        <>
            <Header />

            <main className="mt-16">
                <header>
                    <Container className="flex flex-col gap-y-5 border-[#3A3A3A] pb-4 xl:flex-row xl:justify-between xl:gap-y-0">
                        <div className="inline-flex items-center gap-4">
                            <InfoItem name="WPM" value="0" />
                            <VerticalDivider />
                            <InfoItem name="Accuracy" value="100%" />
                            <VerticalDivider />
                            <InfoItem name="Time" value="0:60" />
                        </div>
                        <div className="flex items-center gap-4 max-sm:hidden">
                            <div className="inline-flex items-center gap-1.5">
                                <div className="text-[#949497]">
                                    Difficulty:
                                </div>
                                <Toggle>Easy</Toggle>
                                <Toggle>Medium</Toggle>
                                <Toggle>Hard</Toggle>
                            </div>
                            <VerticalDivider />
                            <div className="inline-flex items-center gap-1.5">
                                <div className="text-[#949497]">Mode:</div>
                                <Toggle> Timed (60s)</Toggle>
                                <Toggle> Passage</Toggle>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 sm:hidden">
                            <Select>
                                <SelectItem value="first" defaultChecked>
                                    First Item
                                </SelectItem>
                                <SelectSeparator />
                                <SelectItem value="second">
                                    Second Item
                                </SelectItem>
                                <SelectSeparator />
                                <SelectItem value="third">
                                    Third Item
                                </SelectItem>
                            </Select>

                            <Select>
                                <SelectItem value="first" defaultChecked>
                                    First Item
                                </SelectItem>
                                <SelectSeparator />
                                <SelectItem value="second">
                                    Second Item
                                </SelectItem>
                                <SelectSeparator />
                                <SelectItem value="third">
                                    Third Item
                                </SelectItem>
                            </Select>
                        </div>
                    </Container>
                </header>
            </main>
        </>
    );
}

export default App;
