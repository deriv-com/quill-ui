import { ComponentPropsWithoutRef } from "react";

type OpenType =
    | {
          isOpen?: boolean;
          onOpen: () => void;
      }
    | {
          isOpen?: undefined;
          onOpen?: () => void;
      };

export type RootProps = ComponentPropsWithoutRef<"div"> &
    OpenType & {
        onClose?: () => void;
        type?: "modal" | "non-modal";
        expandable?: boolean;
    };

type ActionType = {
    content: string;
    onAction: () => void;
};

export type FooterProps = ComponentPropsWithoutRef<"div"> & {
    primaryAction?: ActionType;
    secondaryAction?: ActionType;
};

export type FooterAlignment = FooterProps;
