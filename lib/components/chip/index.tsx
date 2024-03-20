// import SelectableChip from './selectable-chip'
// import DismissibleChip from './dismissible-chip'
// import DropdownChipSingleSelect from './dropdown-chip-single-select'
// import DropdownChipMultiSelect from './dropdown-chip-multi-select'
import { ReactNode } from "react";

type ChipVariants = {
    // Selectable: typeof SelectableChip;
    // Dismissible: typeof DismissibleChip;
    // SingleSelectDropdown: typeof DropdownChipSingleSelect;
    // MultiSelectDropdown: typeof DropdownChipMultiSelect;
};

export const Chip: ChipVariants = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
};

// Chip.Selectable = SelectableChip;
// Chip.Dismissible = DismissibleChip;
// Chip.SingleSelectDropdown = DropdownChipSingleSelect;
// Chip.MultiSelectDropdown = DropdownChipMultiSelect;

export default Chip;
