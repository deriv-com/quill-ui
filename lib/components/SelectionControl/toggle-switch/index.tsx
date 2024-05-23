import React, { useEffect, useState } from "react";
import "./toggle-switch.scss";
import clsx from "clsx";

export interface SwitchToggleProps {
    disabled?: boolean;
    defaultChecked?: boolean;
    onChange?: (isEnabled: boolean) => void;
    className?: string;
    id?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    checked?: boolean;
}

export const ToggleSwitch = ({
    disabled = false,
    onChange,
    className,
    defaultChecked,
    onFocus,
    onBlur,
    id,
    checked,
}: SwitchToggleProps) => {
    const [isEnabled, setIsEnabled] = useState(defaultChecked || false);

    useEffect(() => {
        if (checked !== undefined) {
            setIsEnabled(checked);
        }
    }, [checked]);

    const toggleSwitch = () => {
        if (!disabled) {
            if (checked === undefined) {
                const toggleEnable = !isEnabled;
                setIsEnabled(toggleEnable);
                onChange?.(toggleEnable);
            } else {
                onChange?.(!checked);
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleSwitch();
        }
    };

    return (
        <button
            className={clsx("toggle-switch", className)}
            onClick={toggleSwitch}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            id={id}
            onBlur={onBlur}
            disabled={disabled}
            aria-pressed={isEnabled}
        >
            <div
                className={clsx("toggle-switch__slider", {
                    enabled: isEnabled,
                })}
            >
                <div
                    className={clsx("toggle-switch__knob", {
                        enabled: isEnabled,
                    })}
                ></div>
            </div>
        </button>
    );
};

export default ToggleSwitch;
