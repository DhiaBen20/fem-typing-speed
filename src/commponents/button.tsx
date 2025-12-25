import type { ComponentProps, ReactNode } from "react";

const classes = {
    parimary:
        "text-xl font-semibold text-white bg-[#177DFF] focus-visible:bg-[#177DFF] hover:bg-[#4CA6FF] px-6 py-4 rounded-xl",
    secondary:
        "text-xl font-semibold text-black bg-white hover:bg-[#E7E7E7] focus-visible:bg-white px-6 py-4 rounded-xl",
    outline:
        "border border-[#717178] px-2.5 py-1.5 text-white focus-visible:border-white focus-visible:text-white rounded-lg hover:border-[#4CA6FF] hover:text-[#4CA6FF]",
};

export default function Button({
    children,
    variant = "parimary",
    ...rest
}: {
    children: ReactNode;
    variant?: "parimary" | "secondary" | "outline";
} & ComponentProps<"button">) {
    return (
        <button
            {...rest}
            className={
                "inline-flex items-center justify-center gap-2.5 ring-[#4CA6FF] ring-offset-2 ring-offset-black focus:outline-none focus-visible:ring-2" +
                " " +
                classes[variant]
            }
        >
            {children}
        </button>
    );
}
