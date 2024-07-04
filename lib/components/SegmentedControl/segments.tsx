import React from "react";
import { Segment, SegmentProps } from "./segment";

interface SegmentsProps extends Omit<SegmentProps, "onClick"> {
    disabled?: SegmentProps["isDisabled"];
    onClick: (ref: React.RefObject<HTMLButtonElement>) => void;
    selected?: SegmentProps["isSelected"];
    selectedRef: React.RefObject<HTMLButtonElement>;
}

export const Segments = ({
    disabled,
    onClick,
    selected,
    selectedRef,
    ...rest
}: SegmentsProps) => {
    const segmentRef = React.useRef<HTMLButtonElement>(null);

    return (
        <Segment
            isDisabled={disabled}
            isSelected={selected}
            onClick={() => onClick(segmentRef)}
            ref={selected ? selectedRef : segmentRef}
            {...rest}
        />
    );
};
