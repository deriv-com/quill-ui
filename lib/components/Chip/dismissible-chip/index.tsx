import React from "react";

import { forwardRef } from "react";
import { Chip } from "../base";
import type { DismissibleChipProps } from "../types";
import clsx from "clsx";
import "./dismissible-chip.scss";

export const DismissibleChip = forwardRef<
    HTMLButtonElement,
    DismissibleChipProps
>(({ onDismiss, className, ...rest }, ref) => {
    return (
        <Chip
            onDismiss={onDismiss}
            className={clsx("quill-dismissible-chip", className)}
            ref={ref}
            dismissible
            {...rest}
        />
    );
});

DismissibleChip.displayName = "DismissibleChip";

export default DismissibleChip;
