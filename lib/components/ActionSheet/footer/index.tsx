import { FooterProps } from "../types";
import { useContext } from "react";
import { ActionSheetContext } from "../root";
import clsx from "clsx";
import "./footer.scss";
import { Button } from "@components/Button";

const Footer = ({
    primaryAction,
    secondaryAction,
    alignment,
    className,
    shouldCloseOnPrimaryButtonClick = true,
    shouldCloseOnSecondaryButtonClick = true,
    isPrimaryButtonDisabled,
    isSecondaryButtonDisabled,
    ...rest
}: FooterProps) => {
    const { handleClose } = useContext(ActionSheetContext);
    if (!primaryAction && !secondaryAction) return null;

    const primaryActionHandler = () => {
        primaryAction?.onAction();
        if (shouldCloseOnPrimaryButtonClick) handleClose?.();
    };

    const secondaryActionHandler = () => {
        secondaryAction?.onAction();
        if (shouldCloseOnSecondaryButtonClick) handleClose?.();
    };

    return (
        <div
            className={clsx(
                "quill-action-sheet--footer",
                `quill-action-sheet--footer__variant--${alignment}`,
                className,
            )}
            {...rest}
        >
            {primaryAction && (
                <Button
                    onClick={primaryActionHandler}
                    color="black-white"
                    size="lg"
                    label={primaryAction.content}
                    fullWidth
                    disabled={isPrimaryButtonDisabled}
                />
            )}
            {secondaryAction && (
                <Button
                    onClick={secondaryActionHandler}
                    variant="secondary"
                    color="black-white"
                    size="lg"
                    label={secondaryAction.content}
                    fullWidth
                    disabled={isSecondaryButtonDisabled}
                />
            )}
        </div>
    );
};

export default Footer;
