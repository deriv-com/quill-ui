import { FooterProps } from "../types";
import Button from "../../button/basic";
import { useContext } from "react";
import { ActionSheetContext } from "../root";
import clsx from "clsx";
import "./footer.scss";

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
                    colorStyle="black"
                    size="lg"
                    fullWidth
                >
                    {primaryAction.content}
                </Button>
            )}
            {secondaryAction && (
                <Button
                    onClick={secondaryActionHandler}
                    variant="secondary"
                    colorStyle="black"
                    size="lg"
                    fullWidth
                >
                    {secondaryAction.content}
                </Button>
            )}
        </div>
    );
};

export default Footer;
