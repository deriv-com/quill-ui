import React from "react";
import { SelectableChipProps } from "../types";
import Chip from "../base";
import clsx from "clsx";
import "./selectable-chip.scss";

export const SelectableChip = ({ className, ...rest }: SelectableChipProps) => {
    return (
        <Chip className={clsx("quill-selectable-chip", className)} {...rest} />
    );
};

export default SelectableChip;
