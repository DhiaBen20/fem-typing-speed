import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import Button from "./button";
import type { ComponentProps, ReactNode } from "react";

export default function DropdownMenu({ children }: { children: ReactNode }) {
    return (
        <RadixDropdownMenu.Root onOpenChange={console.log}>
            <RadixDropdownMenu.Trigger asChild>
                <Button variant="outline">Trigger</Button>
            </RadixDropdownMenu.Trigger>

            <RadixDropdownMenu.Portal>
                <RadixDropdownMenu.Content
                    sideOffset={7}
                    align="start"
                    className="min-w-41.5 rounded-lg bg-[#262626] py-2.5 max-md:w-(--radix-dropdown-menu-trigger-width) sm:w-[166.5px]"
                >
                    {children}
                </RadixDropdownMenu.Content>
            </RadixDropdownMenu.Portal>
        </RadixDropdownMenu.Root>
    );
}

export function DropdownMenuRadioGroup(
    props: ComponentProps<(typeof RadixDropdownMenu)["RadioGroup"]>,
) {
    return <RadixDropdownMenu.RadioGroup {...props} className="space-y-2" />;
}

export function DropdownMenuRadioItem(
    props: ComponentProps<(typeof RadixDropdownMenu)["RadioItem"]>,
) {
    return (
        <RadixDropdownMenu.RadioItem
            {...props}
            className="group flex items-center gap-3 px-2.5 text-white data-highlighted:outline-none"
        >
            <div className="size-4 rounded-full border border-white bg-[#262626] ring-[#4CA6FF] ring-offset-1 ring-offset-[#262626] group-data-highlighted:ring group-data-[state=checked]:border-4 group-data-[state=checked]:border-[#4CA6FF] group-data-[state=checked]:bg-[#121212] group-data-[state=checked]:ring-offset-[#121212]" />
            {props.children}
        </RadixDropdownMenu.RadioItem>
    );
}

export function DropdownSeparator() {
    return <RadixDropdownMenu.Separator className="h-px w-full bg-[#3A3A3A]" />;
}
