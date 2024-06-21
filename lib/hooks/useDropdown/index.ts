import { useState, useCallback, useRef } from "react";
import { useOnClickOutside, useEventListener } from "usehooks-ts";

const ESC_KEY = "27";

const useDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    useOnClickOutside(ref, close);

    useEventListener("keydown", (event) => {
        if (event.code === ESC_KEY) {
            close();
        }
    });

    return { ref, isOpen, open, close };
};

export default useDropdown;
