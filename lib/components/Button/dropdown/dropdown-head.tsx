import { forwardRef } from "react";
import { ButtonProps } from "../types";
import { Button } from "../base";
import { useDropdown } from "@hooks/useDropdown";
import IconButton from "../icon-button";

const HeadComponent = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ icon, label, iconPosition = "end", ...rest }, ref) => {
        const { isOpen } = useDropdown();

        return (
            <>
                {label ? (
                    <Button
                        ref={ref}
                        dropdown={!icon}
                        icon={icon}
                        iconPosition={iconPosition}
                        isDropdownOpen={isOpen}
                        label={label}
                        {...rest}
                    />
                ) : (
                    <IconButton ref={ref} icon={icon} {...rest} />
                )}
            </>
        );
    },
);

export default HeadComponent;
