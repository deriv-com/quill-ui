import { ComponentPropsWithoutRef, useContext } from "react";
import { ActionSheetContext } from "../root";
import clsx from "clsx";

type HeaderProps = ComponentPropsWithoutRef<"div">;

const Header = ({ className, ...rest }: HeaderProps) => {
    const { expandable } = useContext(ActionSheetContext);
    return (
        <div
            className={clsx(
                "quill-action-sheet--header",
                `quill-action-sheet--header__expandable--${expandable}`,
                className,
            )}
            {...rest}
        />
    );
};

export default Header;
