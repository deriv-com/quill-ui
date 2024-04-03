import { ComponentProps } from "react";
import "./handle-bar.scss";

type BarProps = ComponentProps<"div">;

const HandleBar = (props: BarProps) => {
    return (
        <div
            className="quill-action-sheet--handle-bar"
            data-testid="dt-actionsheet-handle-bar"
            {...props}
        >
            <span className="quill-action-sheet--handle-bar--line" />
        </div>
    );
};

export default HandleBar;
