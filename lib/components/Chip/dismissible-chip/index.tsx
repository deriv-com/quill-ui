import React from "react";

import { forwardRef } from "react";
import { Chip } from "../base";
import type { DismissibleChipProps } from "../types";

export const DismissibleChip = forwardRef<
    HTMLButtonElement,
    DismissibleChipProps
>(({ onDismiss, ...rest }, ref) => {
    return <Chip onDismiss={onDismiss} ref={ref} dismissible {...rest} />;
});

DismissibleChip.displayName = "DismissibleChip";

export default DismissibleChip;
