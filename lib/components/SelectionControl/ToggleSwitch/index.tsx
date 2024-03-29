import React, { useState } from "react";
import "./toggle-switch.scss";
import clsx from "clsx";

export interface SwitchToggleProps {
    disabled?: boolean;
    defaultChecked?: boolean;
    onChange?: (isEnabled: boolean) => void;
    wrapperClassName?: string;
    id?: string;
    onFocus?: () => void;
    onBlur?: () => void;
}

const ToggleSwitch = ({
    disabled = false,
    onChange,
    wrapperClassName,
    defaultChecked,
    onFocus,
    onBlur,
    id,
}: SwitchToggleProps) => {
    const [isEnabled, setIsEnabled] = useState(defaultChecked || false);

    const toggleSwitch = () => {
        if (!disabled) {
            const newState = !isEnabled;
            setIsEnabled(newState);
            onChange?.(newState);
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
            className={clsx("toggle-switch", wrapperClassName, { disabled })}
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    className={clsx("toggle-switch__knob", {
                        enabled: isEnabled,
                        disabled,
                    })}
                >
                    <circle cx="10" cy="10" r="10" />
                </svg>
            </div>
        </div>
    );
};

export default ToggleSwitch;
