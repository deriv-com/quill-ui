import React from "react";
import clsx from "clsx";
import "./loader.scss";
import { TRegularSizesWithExtraLarge } from "@types";

type TProps = {
    color?: string;
    variant?: string;
    className?: string;
    size?: TRegularSizesWithExtraLarge;
};

export const Loader = ({ color, variant, className, size }: TProps) => (
    <div
        className={clsx(
            "quill-loader",
            `quill-loader--size-${size}`,
            variant === "primary"
                ? `quill-loader--color--primary-${color}`
                : `quill-loader--color-${color}`,
            className,
        )}
        data-testid="dt_quill-loader"
    ></div>
);
