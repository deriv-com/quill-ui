import {
    LabelPairedPlaceholderSmRegularIcon,
    LabelPairedPlaceholderMdRegularIcon,
    LabelPairedPlaceholderLgRegularIcon,
} from "@deriv/quill-icons";
import { SegmentedControl, SegmentedControlProps } from "../../base";

const PlaceholderIcon = {
    sm: LabelPairedPlaceholderSmRegularIcon,
    md: LabelPairedPlaceholderMdRegularIcon,
    lg: LabelPairedPlaceholderLgRegularIcon,
};

const GroupWithIconsOnly = ({
    onChange,
    selectedItemIndex,
    size,
}: Pick<SegmentedControlProps, "onChange" | "selectedItemIndex" | "size">) => {
    const IconComponent = PlaceholderIcon[size as keyof typeof PlaceholderIcon];
    return (
        <SegmentedControl
            size={size}
            onChange={onChange}
            selectedItemIndex={selectedItemIndex}
        >
            {Array.from(new Array(5)).map(() => (
                <SegmentedControl.Item icon={<IconComponent />} />
            ))}
        </SegmentedControl>
    );
};

export default GroupWithIconsOnly;
