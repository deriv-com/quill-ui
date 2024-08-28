import { ComponentProps } from "react";
import "./handle-bar.scss";
import clsx from "clsx";

export interface BarProps extends ComponentProps<"div"> {
    position?: "sticky" | "absolute";
}

const HandleBar = ({ position = "sticky", ...rest }: BarProps) => {
    return (
        <div
            className={clsx(
                "quill-action-sheet--handle-bar",
                `quill-action-sheet--handle-bar--${position}`,
            )}
            data-testid="dt-actionsheet-handle-bar"
            {...rest}
        >
            <span className="quill-action-sheet--handle-bar--line" />
        </div>
    );
};

export default HandleBar;
