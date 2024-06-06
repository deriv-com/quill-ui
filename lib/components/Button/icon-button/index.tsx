import React, { forwardRef } from "react";
import Button from "../base";
import { IconButtonProps } from "../types";

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ ...rest }, ref) => {
        return <Button iconButton={true} ref={ref} {...rest} />;
    },
);

export default IconButton;
