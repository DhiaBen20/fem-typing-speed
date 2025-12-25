export default function InfoItem({
    name,
    value,
}: {
    name: string;
    value: string;
}) {
    return (
        <div className="text-[#949497]">
            {name}: <span className="font-bold text-white">{value}</span>
        </div>
    );
}
