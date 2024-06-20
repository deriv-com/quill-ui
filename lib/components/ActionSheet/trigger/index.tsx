import { useContext } from "react";
import { ActionSheetContext } from "../root";
import { IconSize } from "@deriv/quill-icons";
import { QuillIconComponent } from "@types";
import { Button, ButtonProps } from "@components/Button";

interface ButtonTriggerProps extends Omit<ButtonProps, "ref"> {
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
    iconClassName,
    ...restProps
}: TriggerProps) => {
    const { handleOpen } = useContext(ActionSheetContext);
    if (Icon) {
        return (
            <Button onClick={handleOpen} {...(restProps as IconTriggerProps)}>
                <Icon
                    data-testid="dt-actionsheet-icon-button"
                    className={iconClassName}
                />
            </Button>
        );
    }
    return <Button onClick={handleOpen} {...(restProps as ButtonTriggerProps)} />;
};

Trigger.displayName = "Trigger";

export default Trigger;
