import * as RadixToggle from "@radix-ui/react-toggle";
import { buttonClasses } from "./button";
import type { ComponentProps } from "react";
import clsx from "clsx";

export default function Toggle(
    props: ComponentProps<(typeof RadixToggle)["Root"]>,
) {
    return (
        <RadixToggle.Root
            {...props}
            className={clsx(
                buttonClasses("outline"),
                "data-disabled:cursor-not-allowed data-disabled:border-[#717178] data-disabled:text-white data-[state=on]:border-[#4CA6FF] data-[state=on]:text-[#4CA6FF]",
            )}
        />
    );
}
