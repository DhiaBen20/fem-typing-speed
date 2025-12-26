import * as RadixSelect from "@radix-ui/react-select";
import { type ComponentProps, type ReactNode } from "react";
import { buttonClasses } from "./button";
import chevron from "../assets/images/icon-down-arrow.svg";

export default function Select({
    children,
    value,
    onValueChange,
    ...rest
}: {
    children: ReactNode;
    value?: string;
    onValueChange?: (v: string) => void;
} & ComponentProps<(typeof RadixSelect)["Content"]>) {
    return (
        <RadixSelect.Root value={value} onValueChange={onValueChange}>
            <RadixSelect.Trigger className={buttonClasses("outline")}>
                <RadixSelect.Value placeholder="select item" />
                <RadixSelect.Icon>
                    <img src={chevron} />
                </RadixSelect.Icon>
            </RadixSelect.Trigger>

            <RadixSelect.Portal>
                <RadixSelect.Content
                    position="popper"
                    align="start"
                    sideOffset={7}
                    {...rest}
                    className="min-w-41.5 space-y-2 rounded-lg bg-[#262626] py-2.5 max-md:w-(--radix-select-trigger-width) sm:w-[166.5px]"
                >
                    {children}
                </RadixSelect.Content>
            </RadixSelect.Portal>
        </RadixSelect.Root>
    );
}

export function SelectItem(
    props: ComponentProps<(typeof RadixSelect)["Item"]>,
) {
    return (
        <RadixSelect.Item
            {...props}
            className="group flex items-center gap-3 px-2.5 text-white data-highlighted:outline-none"
        >
            <div className="size-4 rounded-full border border-white bg-[#262626] ring-[#4CA6FF] ring-offset-2 ring-offset-[#262626] group-data-highlighted:ring-2 group-data-[state=checked]:border-4 group-data-[state=checked]:border-[#4CA6FF] group-data-[state=checked]:bg-[#121212] group-data-[state=checked]:ring-offset-[#121212]" />
            <RadixSelect.ItemText>{props.children}</RadixSelect.ItemText>
        </RadixSelect.Item>
    );
}

export function SelectSeparator() {
    return <RadixSelect.Separator className="h-px w-full bg-[#3A3A3A]" />;
}
