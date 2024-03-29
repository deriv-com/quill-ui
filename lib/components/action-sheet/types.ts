import { ComponentPropsWithoutRef } from "react";
import { ExcludeAllNull } from "../../types";

type OpenType =
    | {
          isOpen?: boolean;
          onOpen: () => void;
      }
    | {
          isOpen?: undefined;
          onOpen?: () => void;
      };

type actionSheetRootCVA = {
    position?: "left" | "right";
    show?: boolean;
};

type actionSheetFooterCVA = {
    alignment?: "vertical" | "horizontal";
};

export type RootProps = ComponentPropsWithoutRef<"div"> &
    ExcludeAllNull<actionSheetRootCVA> &
    OpenType & {
        onClose?: () => void;
        type?: "modal" | "non-modal";
        expandable?: boolean;
    };

export type RootPosition = RootProps["position"];

type ActionType = {
    content: string;
    onAction: () => void;
};

export type FooterProps = ComponentPropsWithoutRef<"div"> &
    actionSheetFooterCVA & {
        primaryAction?: ActionType;
        secondaryAction?: ActionType;
    };

export type FooterAlignment = FooterProps["alignment"];
