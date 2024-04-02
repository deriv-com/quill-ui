import { forwardRef } from "react";
import {
    SocialAppleWhiteIcon,
    SocialGoogleBrandIcon,
    SocialFacebookBrandIcon,
    SocialAppleBlackIcon,
} from "@deriv/quill-icons/Social";
import { SocialButtonProps } from "../types";
import clsx from "clsx";
import { ButtonSize } from "../base";
import "./social.scss";
import "../button.scss";
import { Text } from "../../Typography/text";

export const socialButtonIconSize = {
    md: {
        width: 24,
        height: 24,
    },
    lg: {
        width: 24,
        height: 24,
    },
    xl: {
        width: 32,
        height: 32,
    },
};

export const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(
    (
        {
            size = "md",
            variant = "primary",
            social = "google",
            hideLabel = false,
            disabled = false,
            fullWidth,
            className,
            ...rest
        },
        ref,
    ) => {
        const buttonColorClass =
            variant === "primary"
                ? `social-button__variant--${social}--primary`
                : "social-button__variant--secondary";
        const socialButtonName =
            social.charAt(0).toUpperCase() + social.slice(1);
        const labelSize = size === "md" ? "sm" : size === "lg" ? "md" : "xl";
        const labelColor = `social-button__variant--${social}--${variant}-color`;

        return (
            <button
                className={clsx(
                    "quill-button",
                    ButtonSize[size],
                    buttonColorClass,
                    className,
                    fullWidth && "quill-button__full-width",

                    { ...rest },
                )}
                {...rest}
                disabled={disabled}
                ref={ref}
            >
                {social === "google" && (
                    <SocialGoogleBrandIcon {...socialButtonIconSize[size]} />
                )}
                {social === "facebook" && (
                    <SocialFacebookBrandIcon
                        {...socialButtonIconSize[size]}
                        fill="#fff"
                    />
                )}
                {social === "apple" && variant === "primary" ? (
                    <SocialAppleWhiteIcon {...socialButtonIconSize[size]} />
                ) : social === "apple" && variant === "secondary" ? (
                    <SocialAppleBlackIcon {...socialButtonIconSize[size]} />
                ) : null}
                {!hideLabel && (
                    <Text size={labelSize} bold color={labelColor}>
                        {socialButtonName}
                    </Text>
                )}
            </button>
        );
    },
);

SocialButton.displayName = "SocialButton";

export default SocialButton;
