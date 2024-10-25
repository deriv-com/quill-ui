import React from "react";
import { BasicStepper } from "../base";
import { TBasicStepperProps } from "../types";

export const HorizontalStepper = (props: TBasicStepperProps) => {
    return <BasicStepper {...props} orientation="vertical" />;
};

export default HorizontalStepper;
