import { DropdownContext } from "@providers/dropdown/dropdownContext";
import { RefObject, useContext } from "react";
import { useOnClickOutside } from "usehooks-ts";

export const useDropdown = (
    refs?: RefObject<HTMLElement>[] | RefObject<HTMLElement>,
    // noClose?: boolean,
) => {
    const { isOpen, close, open, selectedValue, setSelectedValue } =
        useContext(DropdownContext);

    // console.log(noClose);

    // if (!noClose && refs) {
    //     useOnClickOutside(refs, close);
    // }
    refs && useOnClickOutside(refs, close);

    return { selectedValue, isOpen, open, close, setSelectedValue };
};
