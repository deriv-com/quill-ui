import { SegmentedControl } from "../../base";

const Group = () => {
    return (
        <SegmentedControl size="sm">
            {Array.from(new Array(5)).map(() => (
                <SegmentedControl.Item icon="&#x26F6;" label="Label" />
            ))}
        </SegmentedControl>
    );
};

export default Group;
