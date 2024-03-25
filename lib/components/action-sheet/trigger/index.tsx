import { ComponentProps, useContext } from "react";
import { Button } from "../../button";
import { ActionSheetContext } from "../root";
import { QuillIconComponent } from "types";
import { IconSize } from "@deriv/quill-icons";

interface ButtonTriggerProps extends ComponentProps<typeof Button> {
    iconComponent?: never;
    iconSize?: never;
    iconClassName?: never;
}

type IconTriggerProps = {
    iconComponent?: QuillIconComponent;
    className?: string;
    iconSize?: IconSize;
    iconClassName?: string;
};

type TriggerProps = ButtonTriggerProps | IconTriggerProps;

const Trigger = ({
    iconComponent: Icon,
    iconSize,
    iconClassName,
    ...restProps
}: TriggerProps) => {
    const { handleOpen } = useContext(ActionSheetContext);
    if (Icon) {
        return (
            <button onClick={handleOpen} {...restProps}>
                <Icon
                    data-testid="dt-actionsheet-icon-button"
                    className={iconClassName}
                    iconSize={iconSize}
                />
            </button>
        );
    }
    return <Button onClick={handleOpen} {...restProps} />;
};

Trigger.displayName = "Trigger";

export default Trigger;
