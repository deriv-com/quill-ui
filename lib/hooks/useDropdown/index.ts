import { useState, useCallback, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

const useDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    useOnClickOutside(ref, close);

    return { ref, isOpen, open, close };
};

export default useDropdown;
