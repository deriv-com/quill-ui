import React, { ComponentProps, forwardRef } from "react";
import "./item-container.scss";
import clsx from "clsx";
import { TMediumSizes, TRegularSizes } from "@types";
import { createPortal } from "react-dom";

export interface ItemContainerProps extends Omit<ComponentProps<"div">, "ref"> {
    size?: TMediumSizes;
    height?: TRegularSizes;
    portalContainer?: Element | DocumentFragment;
}

export const ItemContainer = forwardRef<HTMLDivElement, ItemContainerProps>(
    (
        { size = "md", height = "sm", className, portalContainer, ...rest },
        ref,
    ) => {
        const content = (
            <div
                className={clsx(
                    "quill__item-container",
                    `quill__item-container--size-${size}`,
                    `quill__item-container--height-${height}`,
                    className,
                )}
                ref={ref}
                {...rest}
            />
        );

        if (portalContainer) {
            return createPortal(content, portalContainer);
        }

        return content;
    },
);
