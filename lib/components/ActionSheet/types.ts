import { ComponentPropsWithoutRef, ReactNode } from "react";
import {
    ExcludeAllNull,
    TLeftOrRight,
    TRegularSizesWithExtraLarge,
} from "../../types";
import type { TButtonColor } from "@components/Button/types";

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
 * Mirrors the footer's `ActionType`. Disabled/close behaviour lives on
 * `HeaderProps` (`isSaveActionDisabled`, `shouldCloseOnSaveActionClick`).
 */
export interface HeaderActionType {
    /** Overrides the built-in glyph (X for close, check for save). */
    icon?: ReactNode;
    /**
     * Runs only on click - dismissing via overlay, handlebar or close does not
     * invoke it, so `saveAction` is safe for committing changes.
     */
    onAction?: () => void;
    /**
     * Maps to `aria-label`, not `ButtonProps.label` - renders nothing visually.
     * Defaults to "Close"/"Save".
     */
    ariaLabel?: string;
    /**
     * Opts out of the 40px default onto the shared scale (sm 24, md 32, lg 48,
     * xl 64). Leave unset unless a design calls for one of those steps.
     */
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
