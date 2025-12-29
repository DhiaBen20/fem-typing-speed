import type { ComponentProps, ReactNode } from "react";

export default function Container({
    children,
    className = "",
    ...rest
}: {
    className?: string;
    children: ReactNode;
} & ComponentProps<"div">) {
    return (
        <div
            {...rest}
            className={`mx-auto px-4 md:px-8 xl:max-w-[1216px] xl:px-0 ${className}`}
        >
            {children}
        </div>
    );
}
