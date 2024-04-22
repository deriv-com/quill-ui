import { ComponentProps, forwardRef } from "react";
import Input from "../base";
import React from "react";

export type TextFieldProps = ComponentProps<typeof Input>;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    (props, ref) => <Input {...props} ref={ref} />,
);

export default TextField;
