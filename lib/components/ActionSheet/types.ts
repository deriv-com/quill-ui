import { ComponentPropsWithoutRef } from "react";
import { ExcludeAllNull, TLeftOrRight } from "../../types";
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
}

export type RootPosition = RootProps["position"];

interface ActionType {
    content?: React.ReactNode;
    onAction?: () => void;
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
