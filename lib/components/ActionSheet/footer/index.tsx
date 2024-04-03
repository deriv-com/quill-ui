import { FooterProps } from "../types";
// import Button from "../../button/basic";
import { useContext } from "react";
import { ActionSheetContext } from "../root";
import clsx from "clsx";
import "./footer.scss";
import { Button } from "../../Button";

const Footer = ({
    primaryAction,
    secondaryAction,
    alignment,
    className,
    ...restProps
}: FooterProps) => {
    const { handleClose } = useContext(ActionSheetContext);
    if (!primaryAction && !secondaryAction) return null;

    const primaryActionHandler = () => {
        primaryAction?.onAction();
        handleClose?.();
    };

    const secondaryActionHandler = () => {
        secondaryAction?.onAction();
        handleClose?.();
    };

    return (
        <div
            className={clsx(
                "quill-action-sheet--footer",
                `quill-action-sheet--footer__variant--${alignment}`,
                className,
            )}
            {...restProps}
        >
            {primaryAction && (
                <Button
                    onClick={primaryActionHandler}
                    color="black"
                    size="lg"
                    label={primaryAction.content}
                    fullWidth
                />
            )}
            {secondaryAction && (
                <Button
                    onClick={secondaryActionHandler}
                    variant="secondary"
                    color="black"
                    size="lg"
                    label={secondaryAction.content}
                    fullWidth
                />
            )}
        </div>
    );
};

export default Footer;
