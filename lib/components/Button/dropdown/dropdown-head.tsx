import { forwardRef } from "react";
import { ButtonProps } from "../types";
import { Button } from "../base";
import { useDropdown } from "@hooks/useDropdown";
import IconButton from "../icon-button";

const HeadComponent = forwardRef<
    HTMLButtonElement,
    Omit<ButtonProps, "iconPosition">
>(({ icon, label, ...rest }, ref) => {
    const { isOpen } = useDropdown();

    return (
        <>
            {label ? (
                <Button
                    ref={ref}
                    dropdown={!icon}
                    icon={icon}
                    iconPosition="end"
                    isDropdownOpen={isOpen}
                    label={label}
                    {...rest}
                />
            ) : (
                <IconButton ref={ref} icon={icon} {...rest} />
            )}
        </>
    );
});

export default HeadComponent;
