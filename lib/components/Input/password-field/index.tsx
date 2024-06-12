import { ComponentProps, forwardRef } from "react";
import Input from "../base";
import React from "react";
import {
    StandaloneEyeRegularIcon,
    StandaloneEyeSlashRegularIcon,
    StandaloneLockRegularIcon,
} from "@deriv/quill-icons/Standalone";
import "./password-field.scss";

export type PasswordFieldProps = ComponentProps<typeof Input>;

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
    (props, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);
        const handlePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };
        return (
            <Input
                {...props}
                className="password_field"
                type={showPassword ? "text" : "password"}
                leftIcon={<StandaloneLockRegularIcon iconSize="sm" />}
                triggerActionIcon={
                    showPassword ? (
                        <StandaloneEyeRegularIcon
                            onClick={handlePasswordVisibility}
                            iconSize="sm"
                            data-testid="eye-icon"
                        />
                    ) : (
                        <StandaloneEyeSlashRegularIcon
                            onClick={handlePasswordVisibility}
                            iconSize="sm"
                            data-testid="eye-slash-icon"
                        />
                    )
                }
                ref={ref}
            />
        );
    },
);

export default PasswordField;
