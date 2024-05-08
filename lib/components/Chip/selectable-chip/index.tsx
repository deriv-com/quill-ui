import React from "react";
import { SelectableChipProps } from "../types";
import Chip from "../base";

export const SelectableChip = ({ ...rest }: SelectableChipProps) => {
    return <Chip {...rest} />;
};

export default SelectableChip;
