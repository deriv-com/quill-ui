import React, { useState } from "react";
import "./toggle-switch.scss"; // Ensure your SCSS file path is correct
import clsx from "clsx";

export interface SwitchToggleProps {
    disabled?: boolean;
    defaultChecked?: boolean;
    onChange?: (isEnabled: boolean) => void;
    className?: string;
    id?: string;
    onFocus?: () => void;
    onBlur?: () => void;
}

const ToggleSwitch = ({
    disabled = false,
    onChange,
    className,
    defaultChecked,
    onFocus,
    onBlur,
    id,
}: SwitchToggleProps) => {
    const [isEnabled, setIsEnabled] = useState(defaultChecked || false);

    const toggleSwitch = () => {
        if (!disabled) {
            const toggleEnable = !isEnabled;
            setIsEnabled(toggleEnable);
            onChange?.(toggleEnable);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleSwitch();
        }
    };

    return (
        <div
            className={clsx("toggle-switch", className, { disabled })}
            tabIndex={disabled ? -1 : 0}
            onClick={toggleSwitch}
            onKeyDown={handleKeyDown}
            role="button"
            aria-pressed={isEnabled}
            onFocus={onFocus}
            id={id}
            onBlur={onBlur}
            aria-disabled={disabled}
        >
            <div
                className={clsx("toggle-switch__slider", {
                    enabled: isEnabled,
                })}
            >
                <div className={clsx("toggle-switch__knob", { enabled: isEnabled, disabled })}></div>
            </div>
        </div>
    );
};

export default ToggleSwitch;
