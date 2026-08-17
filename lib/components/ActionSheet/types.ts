import { ComponentPropsWithoutRef, ReactNode } from "react";
import {
    ExcludeAllNull,
    TLeftOrRight,
    TRegularSizesWithExtraLarge,
} from "../../types";
import { TButtonColor } from "@components/Button";

interface OpenType {
    isOpen?: boolean | undefined;
    onOpen?: () => void;
}

interface actionSheetRootCVA {
    position?: TLeftOrRight;
    show?: boolean;
}

interface actionSheetFooterCVA {
    alignment?: "vertical" | "horizontal";
}

export interface RootProps
    extends ComponentPropsWithoutRef<"div">,
        ExcludeAllNull<actionSheetRootCVA>,
        OpenType {
    onClose?: () => void;
    type?: "modal" | "non-modal";
    expandable?: boolean;
    shouldBlurOnClose?: boolean;
}

export type RootPosition = RootProps["position"];

interface ActionType {
    content: React.ReactNode;
    onAction: () => void;
}

/**
 * Mirrors the footer's `ActionType`: the object carries only what is rendered
 * plus the callback, while disabled/close behaviour is driven by sibling props
 * on `HeaderProps` - see `isSaveActionDisabled` and `shouldCloseOnSaveActionClick`.
 */
export interface HeaderActionType {
    /**
     * Overrides the built-in glyph - an X for `closeAction`, a check for
     * `saveAction`. Only pass this when the design calls for something else,
     * e.g. a back arrow in a multi-step sheet.
     */
    icon?: ReactNode;
    /**
     * Runs only when the button itself is clicked. Dismissing the sheet through
     * the overlay, the handlebar or the close action closes it without invoking
     * this callback, so `saveAction` is safe to use for committing changes -
     * same contract as the footer's `primaryAction`.
     */
    onAction?: () => void;
    /**
     * Accessible name for the icon-only button - maps to `aria-label`, so it
     * renders nothing visually. Note this is NOT `ButtonProps.label`, which
     * renders visible text. Defaults to "Close"/"Save"; pass a localised
     * string to translate it.
     */
    ariaLabel?: string;
    size?: TRegularSizesWithExtraLarge;
}

export interface FooterProps
    extends ComponentPropsWithoutRef<"div">,
        actionSheetFooterCVA {
    primaryAction?: ActionType;
    secondaryAction?: ActionType;
    shouldCloseOnPrimaryButtonClick?: boolean;
    shouldCloseOnSecondaryButtonClick?: boolean;
    isPrimaryButtonDisabled?: boolean;
    isSecondaryButtonDisabled?: boolean;
    primaryButtonColor?: TButtonColor;
}

export type FooterAlignment = FooterProps["alignment"];
