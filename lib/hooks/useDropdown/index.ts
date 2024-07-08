import { DropdownContext } from "@providers/dropdown/dropdownContext";
import { RefObject, useContext } from "react";
import { useOnClickOutside } from "usehooks-ts";

export const useDropdown = (
    refs?: RefObject<HTMLElement>[] | RefObject<HTMLElement>,
) => {
    const { isOpen, close, open, selectedValue, setSelectedValue } =
        useContext(DropdownContext);

    refs && useOnClickOutside(refs, close);

    return { selectedValue, isOpen, open, close, setSelectedValue };
};
