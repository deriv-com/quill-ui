import { DropdownContext } from "@providers/dropdown/dropdownContext";
import { useContext, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

export const useDropdown = () => {
    const ref = useRef<HTMLDivElement>(null);

    const { isOpen, close, open, selectedValue, setSelectedValue } =
        useContext(DropdownContext);

    useOnClickOutside(ref, close);

    return { ref, selectedValue, isOpen, open, close, setSelectedValue };
};
