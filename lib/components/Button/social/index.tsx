import { forwardRef } from "react";
import {
    SocialAppleWhiteIcon,
    SocialGoogleBrandIcon,
    SocialFacebookBrandDarkIcon,
    SocialAppleBlackIcon,
    SocialFacebookBrandIcon,
} from "@deriv/quill-icons/Social";
import { SocialButtonProps } from "../types";
import clsx from "clsx";
import { ButtonSize } from "../base";
import "./social.scss";
import "../button.scss";
import { Text } from "@components/Typography";

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
export const SocialButtonSize = {
    md: "social-button__icon-only--md",
    lg: "social-button__icon-only--lg",
    xl: "social-button__icon-only--xl",
} as const;

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
                    buttonColorClass,
                    className,
                    fullWidth && "quill-button__full-width",
                    !fullWidth && hideLabel
                        ? SocialButtonSize[size]
                        : ButtonSize[size],

                    { ...rest },
                )}
                {...rest}
                disabled={disabled}
                ref={ref}
            >
                {social === "google" && (
                    <SocialGoogleBrandIcon {...socialButtonIconSize[size]} />
                )}
                {social === "facebook" &&
                    (variant === "primary" ? (
                        <SocialFacebookBrandDarkIcon
                            {...socialButtonIconSize[size]}
                            fill="#fff"
                        />
                    ) : (
                        <SocialFacebookBrandIcon
                            {...socialButtonIconSize[size]}
                            fill="#fff"
                        />
                    ))}
                {social === "apple" && variant === "secondary" ? (
                    <SocialAppleBlackIcon {...socialButtonIconSize[size]} />
                ) : (
                    social === "apple" && (
                        <SocialAppleWhiteIcon {...socialButtonIconSize[size]} />
                    )
                )}
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
