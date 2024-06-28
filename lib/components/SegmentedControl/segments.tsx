import React from "react";
import { Segment, SegmentProps } from "./segment";

interface SegmentsProps extends Omit<SegmentProps, "onClick"> {
    animatedOptionIdx: number | null;
    hasAnimation?: boolean;
    disabled?: SegmentProps["isDisabled"];
    idx: number;
    onClick: (ref: React.RefObject<HTMLButtonElement>) => void;
    selected?: SegmentProps["isSelected"];
    selectedRef: React.RefObject<HTMLButtonElement>;
}

export const Segments = ({
    animatedOptionIdx,
    hasAnimation,
    disabled,
    idx,
    onClick,
    selected,
    selectedRef,
    ...rest
}: SegmentsProps) => {
    const segmentRef = React.useRef<HTMLButtonElement>(null);

    return (
        <Segment
            isAnimated={selected && animatedOptionIdx === idx && hasAnimation}
            isDisabled={disabled}
            isSelected={selected}
            onClick={() => onClick(segmentRef)}
            ref={selected ? selectedRef : segmentRef}
            {...rest}
        />
    );
};
