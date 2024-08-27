import { ComponentPropsWithoutRef, ReactNode, useContext } from "react";
import { ActionSheetContext } from "../root";
import clsx from "clsx";
import { Heading, Text } from "@components/Typography";
import { IconButton } from "@components/Button";
import "./header.scss";

export interface HeaderProps
    extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
    title?: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    iconPosition?: "right" | "left";
    closeIcon?: ReactNode;
}

const Header = ({
    className,
    title,
    description,
    icon: Icon,
    iconPosition = "right",
    closeIcon: CloseIcon,
    ...rest
}: HeaderProps) => {
    const { expandable } = useContext(ActionSheetContext);
    const { handleClose } = useContext(ActionSheetContext);

    return (
        <div
            className={clsx(
                "quill-action-sheet--header",
                `quill-action-sheet--header__expandable--${expandable}`,
                className,
            )}
            data-testid="action-sheet-header"
            {...rest}
        >
            <div className="quill-action-sheet--title">
                {Icon && (
                    <div
                        className={clsx(
                            "quill-action-sheet--title--icon",
                            `quill-action-sheet--title--icon--${iconPosition}`,
                        )}
                    >
                        {Icon}
                    </div>
                )}
                {title && <Heading.H5>{title}</Heading.H5>}
                {CloseIcon && (
                    <IconButton
                        color="black-white"
                        icon={CloseIcon}
                        className={clsx(
                            "quill-action-sheet--title--icon",
                            "quill-action-sheet--title--icon--close",
                        )}
                        onClick={handleClose}
                        size="md"
                        variant="tertiary"
                    />
                )}
            </div>
            {description && (
                <Text className="quill-action-sheet--description">
                    {description}
                </Text>
            )}
        </div>
    );
};

export default Header;
