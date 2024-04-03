import { ComponentPropsWithoutRef, ReactNode, useContext } from "react";
import { ActionSheetContext } from "../root";
import clsx from "clsx";
import "./header.scss";
import { Heading, Text } from "../../Typography";

interface HeaderProps extends ComponentPropsWithoutRef<"div"> {
    title?: string;
    description?: string;
    icon?: ReactNode;
    closeIcon?: ReactNode;
}

const Header = ({
    className,
    title,
    description,
    icon: Icon,
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
                <div className="quill-action-sheet--title--icon">{Icon}</div>
                <Heading.H5>{title}</Heading.H5>
                <button
                    className="quill-action-sheet--title--icon quill-action-sheet--title--icon--close"
                    onClick={handleClose}
                >
                    {CloseIcon}
                </button>
            </div>
            <Text>{description}</Text>
        </div>
    );
};

export default Header;
