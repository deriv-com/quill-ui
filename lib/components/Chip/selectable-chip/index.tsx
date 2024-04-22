import React from "react";
import { SelectableChipProps } from "../types";
import Base from "../base";
import clsx from "clsx";
import "./selectable-chip.scss";

export const SelectableChip = ({ className, ...rest }: SelectableChipProps) => {
    return (
        <Base className={clsx("quill-selectable-chip", className)} {...rest} />
    );
};

export default SelectableChip;
