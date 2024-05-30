import SelectableChip from "./selectable-chip";
import DismissibleChip from "./dismissible-chip";
import ChipBase from "./base";
import DropdownChipSingleSelect from "./dropdown-chip-single-select";
import DropdownChipMultiSelect from "./dropdown-chip-multi-select";
import { ReactNode } from "react";

type ChipVariants = {
    Selectable: typeof SelectableChip;
    Dismissible: typeof DismissibleChip;
    SingleSelectDropdown: typeof DropdownChipSingleSelect;
    MultiSelectDropdown: typeof DropdownChipMultiSelect;
    Base: typeof ChipBase;
};

export const Chip: ChipVariants = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
};

Chip.Selectable = SelectableChip;
Chip.Dismissible = DismissibleChip;
Chip.SingleSelectDropdown = DropdownChipSingleSelect;
Chip.MultiSelectDropdown = DropdownChipMultiSelect;
Chip.Base = ChipBase;

export default Chip;
