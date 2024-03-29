import { ComponentProps, forwardRef } from "react";
import Input from "../base";
import React from "react";

export type TextFieldProps = ComponentProps<typeof Input>;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    (props, ref) => {
        return <Input {...props} ref={ref} />;
    },
);

TextField.displayName = "TextField";

export default TextField;
