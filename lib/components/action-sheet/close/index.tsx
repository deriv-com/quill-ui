import { ComponentProps, useContext } from "react";
import qtMerge from "qtMerge";
import { ActionSheetContext } from "../root";

type CloseProps = ComponentProps<"button">;

const Close = ({ className, ...restProps }: CloseProps) => {
    const { handleClose } = useContext(ActionSheetContext);
    return (
        <button
            className={qtMerge(
                "pointer-events-auto sticky top-800 z-20 ml-auto hidden cursor-pointer lg:block",
                className,
            )}
            onClick={handleClose}
            {...restProps}
        />
    );
};

Close.displayName = "Close";

export default Close;
