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

// Fixed by the design so consumers need not import them; override via
// `HeaderActionType.icon`.
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

// Slot widths in ascending order. The 40px header default sits between the
// shared scale's `md` (32px) and `lg` (48px).
const SLOT_WIDTH_ORDER = ["sm", "md", "default", "lg", "xl"] as const;

type SlotSize = (typeof SLOT_WIDTH_ORDER)[number];

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

    // Both slots reserve the same width - the wider of the controls actually
    // present - so `space-between` leaves the title centred even when the two
    // actions disagree about size, or when one side is an empty spacer. An
    // absent action contributes nothing, so a lone `sm` control is mirrored at
    // `sm` rather than widened to the default.
    const slotSize = [closeAction, saveAction]
        .filter(Boolean)
        .map((action) => action?.size ?? "default")
        .reduce<SlotSize>(
            (widest, size) =>
                SLOT_WIDTH_ORDER.indexOf(size) >
                SLOT_WIDTH_ORDER.indexOf(widest)
                    ? size
                    : widest,
            "sm",
        );

    // The opposite side renders an empty slot to keep the title centred.
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
            // Only the save action can keep the sheet open.
            if (!isSave || shouldCloseOnSaveActionClick) handleClose?.();
        };

        return (
            <div
                className={clsx(
                    "quill-action-sheet--title--action",
                    `quill-action-sheet--title--action--${
                        isSave ? "end" : "start"
                    }`,
                    `quill-action-sheet--title--action__size--${slotSize}`,
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
                            // 40px has no step on the shared scale, so it
                            // comes from header.scss; `size` opts back out.
                            !size &&
                                "quill-action-sheet--title--action-button__size--default",
                        )}
                        color="black-white"
                        data-testid={`dt-actionsheet-header-${kind}-action`}
                        // Only the save action carries state.
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
