import { ComponentPropsWithoutRef, ReactNode, useContext } from "react";
import { ActionSheetContext } from "../root";
import clsx from "clsx";
import { Heading, Text } from "@components/Typography";
import { IconButton } from "@components/Button/icon-button";
import {
    LabelPairedCheckCaptionBoldIcon,
    LabelPairedXmarkCaptionBoldIcon,
} from "@deriv/quill-icons/LabelPaired";
import { HeaderActionType } from "../types";
import "./header.scss";

// Both glyphs are fixed by the design, so consumers should not have to import
// them. Overridable via `HeaderActionType.icon`.
const ACTION_DEFAULTS = {
    close: {
        icon: <LabelPairedXmarkCaptionBoldIcon />,
        ariaLabel: "Close",
    },
    save: {
        icon: <LabelPairedCheckCaptionBoldIcon />,
        ariaLabel: "Save",
    },
} as const;

export interface HeaderProps
    extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
    title?: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    iconPosition?: "right" | "left";
    closeIcon?: ReactNode;
    centered?: boolean;
    /**
     * Dismiss action on the leading edge of the title row. It has no
     * enabled/disabled state and always closes the sheet without committing.
     */
    closeAction?: HeaderActionType;
    /**
     * Save action on the trailing edge of the title row. Its enabled/disabled
     * state is driven by `isSaveActionDisabled`.
     */
    saveAction?: HeaderActionType;
    isSaveActionDisabled?: boolean;
    shouldCloseOnSaveActionClick?: boolean;
}

const Header = ({
    className,
    title,
    description,
    icon: Icon,
    iconPosition = "right",
    closeIcon: CloseIcon,
    centered = true,
    closeAction,
    saveAction,
    isSaveActionDisabled,
    shouldCloseOnSaveActionClick = true,
    ...rest
}: HeaderProps) => {
    const { expandable } = useContext(ActionSheetContext);
    const { handleClose } = useContext(ActionSheetContext);
    const hasActions = !!closeAction || !!saveAction;

    // The opposite side is still rendered as an empty slot so the title stays
    // optically centred when only one action is provided.
    const renderAction = (
        action: HeaderActionType | undefined,
        kind: "close" | "save",
    ) => {
        if (!hasActions) return null;

        const defaults = ACTION_DEFAULTS[kind];
        const {
            icon = defaults.icon,
            onAction,
            ariaLabel = defaults.ariaLabel,
            size,
        } = action ?? {};
        const isSave = kind === "save";

        const actionHandler = () => {
            onAction?.();
            // The close action always dismisses - that is what it is for. Only
            // the save action can keep the sheet open.
            if (!isSave || shouldCloseOnSaveActionClick) handleClose?.();
        };

        return (
            <div
                className={clsx(
                    "quill-action-sheet--title--action",
                    `quill-action-sheet--title--action--${
                        isSave ? "end" : "start"
                    }`,
                )}
            >
                {action && (
                    <IconButton
                        aria-label={ariaLabel}
                        className={clsx(
                            "quill-action-sheet--title--action-button",
                            `quill-action-sheet--title--action-button__color--${
                                isSave ? "primary" : "monochrome"
                            }`,
                            // The design size is 40px, which the shared scale
                            // has no step for, so it comes from the header's
                            // own stylesheet. Passing `size` opts back out to
                            // the shared scale.
                            !size &&
                                "quill-action-sheet--title--action-button__size--default",
                        )}
                        color="black-white"
                        data-testid={`dt-actionsheet-header-${kind}-action`}
                        // Only the save action carries state; the close action
                        // stays neutral and always enabled.
                        disabled={isSave ? isSaveActionDisabled : undefined}
                        icon={icon}
                        onClick={actionHandler}
                        size={size ?? "md"}
                        variant="tertiary"
                    />
                )}
            </div>
        );
    };

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
            <div
                className={clsx(
                    "quill-action-sheet--title",
                    hasActions && "quill-action-sheet--title__has-actions",
                )}
            >
                {renderAction(closeAction, "close")}
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
                {title && (
                    <Heading.H5
                        centered={centered}
                        className="quill-action-sheet--title-text"
                    >
                        {title}
                    </Heading.H5>
                )}
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
                {renderAction(saveAction, "save")}
            </div>
            {description && (
                <Text
                    centered={centered}
                    className="quill-action-sheet--description"
                >
                    {description}
                </Text>
            )}
        </div>
    );
};

export default Header;
