import { ComponentProps, forwardRef } from "react";
import Input from "../base";
import React from "react";
import {
    StandaloneEyeRegularIcon,
    StandaloneEyeSlashRegularIcon,
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
                triggerActionIcon={
                    showPassword ? (
                        <StandaloneEyeSlashRegularIcon
                            onClick={handlePasswordVisibility}
                            iconSize="sm"
                            data-testid="eye-slash-icon"
                            className="password_field__eye-icon"
                        />
                    ) : (
                        <StandaloneEyeRegularIcon
                            onClick={handlePasswordVisibility}
                            iconSize="sm"
                            data-testid="eye-icon"
                            className="password_field__eye-icon"
                        />
                    )
                }
                ref={ref}
            />
        );
    },
);

export default PasswordField;
