import { StandaloneLoaderRegularIcon } from "@deriv/quill-icons";
import { TRegularSizesWithExtraSmallandExtraLarge } from "@types";
import React from "react";
import "./spinner.scss";

export interface SpinnerProps {
    size?: TRegularSizesWithExtraSmallandExtraLarge;
}

export const Spinner = ({ size = "md" }: SpinnerProps) => {
    return (
        <StandaloneLoaderRegularIcon
            className="quill-loader__spinner"
            iconSize={size}
        />
    );
};
