import { BasicStepper } from '../index';
import { TBasicStepperProps } from '../types';
import "../stepper.scss";

export const VerticalStepper = (props: TBasicStepperProps) => {
    return <BasicStepper {...props} orientation="vertical" />;
};