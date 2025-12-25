import * as RadixToggle from "@radix-ui/react-toggle";
import { buttonClasses } from "./button";
import type { ComponentProps } from "react";

export default function Toggle(props: ComponentProps<typeof RadixToggle["Root"]>) {
    return (
        <RadixToggle.Root
            {...props}
            className={buttonClasses("outline")+ " data-[state=on]:border-[#4CA6FF] data-[state=on]:text-[#4CA6FF]"}
        />
    );
}
