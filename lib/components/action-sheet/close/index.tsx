import { ComponentProps, useContext } from "react";
import { ActionSheetContext } from "../root";
import "./close.scss";

type CloseProps = ComponentProps<"button">;

const Close = ({ ...restProps }: CloseProps) => {
    const { handleClose } = useContext(ActionSheetContext);
    return (
        <button
            className="quill-action-sheet--close"
            onClick={handleClose}
            {...restProps}
        />
    );
};

export default Close;
