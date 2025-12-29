import clsx from "clsx";

export default function InfoItem({
    name,
    value,
    color = "white",
}: {
    color?: "white" | "yellow" | "red";
    name: string;
    value: string | number;
}) {
    return (
        <div>
            <span className="text-xl text-[#949497]">{name}</span>:{" "}
            <span
                className={clsx("text-2xl font-bold", {
                    "text-white": color === "white",
                    "text-[#F4DC73]": color === "yellow",
                    "text-[#D64D5B]": color === "red",
                })}
            >
                {value}
            </span>
        </div>
    );
}
