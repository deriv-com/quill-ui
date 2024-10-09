import { BasicStepper } from '../index';
import { TBasicStepperProps } from '../types';

export const VerticalStepper = (props: TBasicStepperProps) => {
    return <BasicStepper {...props} orientation="vertical" />;
};