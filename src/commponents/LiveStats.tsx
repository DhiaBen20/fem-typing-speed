import InfoItem from "./InfoItem";
import VerticalDivider from "./VerticalDivider";

export default function LiveStats() {
    return (
        <div className="inline-flex items-center gap-4">
            <InfoItem name="WPM" value="0" />
            <VerticalDivider />
            <InfoItem name="Accuracy" value="100%" />
            <VerticalDivider />
            <InfoItem name="Time" value="0:60" />
        </div>
    );
}
