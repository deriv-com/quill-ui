import { SegmentedControl, SegmentedControlProps } from "../../base";

const GroupWithLabelsOnly = ({
    onChange,
    selectedItemIndex,
    size,
}: Pick<SegmentedControlProps, "onChange" | "selectedItemIndex" | "size">) => (
    <SegmentedControl
        size={size}
        onChange={onChange}
        selectedItemIndex={selectedItemIndex}
    >
        {Array.from(new Array(5)).map(() => (
            <SegmentedControl.Item label="Label" />
        ))}
    </SegmentedControl>
);

export default GroupWithLabelsOnly;
