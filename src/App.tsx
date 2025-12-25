import Button from "./commponents/button";
import Container from "./commponents/Container";
import Header from "./commponents/Header";
import InfoItem from "./commponents/InfoItem";
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
                                <Button variant="outline">Easy</Button>
                                <Button variant="outline">Medium</Button>
                                <Button variant="outline">Hard</Button>
                            </div>
                            <VerticalDivider />
                            <div className="inline-flex items-center gap-1.5">
                                <div className="text-[#949497]">Mode:</div>
                                <Button variant="outline"> Timed (60s)</Button>
                                <Button variant="outline"> Passage</Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 sm:hidden">
                            {/* <DropdownMenu.Root>
                                <DropdownMenu.Trigger className="rounded-lg border border-[#3A3A3A] px-2.5 py-1.5 text-white">
                                    Hard
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content
                                        sideOffset={7}
                                        align="start"
                                        className="rounded-lg bg-[#262626] py-2.5 max-md:w-(--radix-dropdown-menu-trigger-width) sm:w-[166.5px]"
                                    >
                                        <DropdownMenu.RadioGroup
                                            value={"easy"}
                                            className="space-y-2"
                                        >
                                            <DropdownMenu.RadioItem
                                                value="easy"
                                                defaultChecked
                                                className="group flex items-center gap-3 px-2.5 text-white data-highlighted:outline-none"
                                            >
                                                <div className="size-4 rounded-full border border-white bg-[#262626] ring-[#4CA6FF] ring-offset-1 ring-offset-[#262626] group-data-highlighted:ring group-data-[state=checked]:border-4 group-data-[state=checked]:border-[#4CA6FF] group-data-[state=checked]:bg-[#121212] group-data-[state=checked]:ring-offset-[#121212]" />
                                                Easy
                                            </DropdownMenu.RadioItem>
                                            <DropdownMenu.Separator className="h-px w-full bg-[#3A3A3A]" />
                                            <DropdownMenu.RadioItem
                                                value="medium"
                                                defaultChecked
                                                className="group flex items-center gap-3 px-2.5 text-white data-highlighted:outline-none"
                                            >
                                                <div className="size-4 rounded-full border border-white bg-[#262626] ring-[#4CA6FF] ring-offset-1 ring-offset-[#262626] group-data-highlighted:ring group-data-[state=checked]:border-4 group-data-[state=checked]:border-[#4CA6FF] group-data-[state=checked]:bg-[#121212] group-data-[state=checked]:ring-offset-[#121212]" />
                                                Medium
                                            </DropdownMenu.RadioItem>
                                            <DropdownMenu.Separator className="h-px w-full bg-[#3A3A3A]" />
                                            <DropdownMenu.RadioItem
                                                value="hard"
                                                defaultChecked
                                                className="group flex items-center gap-3 px-2.5 text-white data-highlighted:outline-none"
                                            >
                                                <div className="size-4 rounded-full border border-white bg-[#262626] ring-[#4CA6FF] ring-offset-1 ring-offset-[#262626] group-data-highlighted:ring group-data-[state=checked]:border-4 group-data-[state=checked]:border-[#4CA6FF] group-data-[state=checked]:bg-[#121212] group-data-[state=checked]:ring-offset-[#121212]" />
                                                Hard
                                            </DropdownMenu.RadioItem>
                                        </DropdownMenu.RadioGroup>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Root>

                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger className="rounded-lg border border-[#3A3A3A] px-2.5 py-1.5 text-white">
                                    Timed (60s)
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content
                                        align="start"
                                        className="w-[166.5px] rounded-lg bg-[#262626] py-2.5"
                                    >
                                        <DropdownMenu.RadioGroup
                                            value={"medium"}
                                            className="space-y-2"
                                        >
                                            <DropdownMenu.RadioItem
                                                value="easy"
                                                defaultChecked
                                                className="group flex items-center gap-3 px-2.5 text-white"
                                            >
                                                <div className="group-data-highlighted: size-4 rounded-full border border-white ring-[#4CA6FF] ring-offset-2 ring-offset-amber-600 group-data-[state=checked]:border-4 group-data-[state=checked]:border-[#4CACFF] group-data-[state=checked]:bg-black" />
                                                Easy
                                            </DropdownMenu.RadioItem>
                                            <DropdownMenu.Separator className="h-px w-full bg-[#3A3A3A]" />
                                            <DropdownMenu.RadioItem
                                                value="medium"
                                                defaultChecked
                                                className="group flex items-center gap-3 px-2.5 text-white"
                                            >
                                                <div className="group-data-highlighted: size-4 rounded-full border border-white ring-[#4CA6FF] ring-offset-2 ring-offset-amber-600 group-data-[state=checked]:border-4 group-data-[state=checked]:border-[#4CACFF] group-data-[state=checked]:bg-black" />
                                                Medium
                                            </DropdownMenu.RadioItem>
                                            <DropdownMenu.Separator className="h-px w-full bg-[#3A3A3A]" />
                                            <DropdownMenu.RadioItem
                                                value="hard"
                                                defaultChecked
                                                className="group flex items-center gap-3 px-2.5 text-white"
                                            >
                                                <div className="group-data-highlighted: size-4 rounded-full border border-white ring-[#4CA6FF] ring-offset-2 ring-offset-amber-600 group-data-[state=checked]:border-4 group-data-[state=checked]:border-[#4CACFF] group-data-[state=checked]:bg-black" />
                                                Hard
                                            </DropdownMenu.RadioItem>
                                        </DropdownMenu.RadioGroup>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Root> */}
                        </div>
                    </Container>
                </header>
            </main>
        </>
    );
}

export default App;
