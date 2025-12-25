import type { ReactNode } from "react";

export default function Container({
    children,
    className = "",
}: {
    className?: string;
    children: ReactNode;
}) {
    return (
        <div
            className={`mx-auto px-4 md:px-8 xl:max-w-[1216px] xl:px-0 ${className}`}
        >
            {children}
        </div>
    );
}
