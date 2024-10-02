import { BasicStepper } from '../index';
import { Steps, TBasicStepperProps } from '../types';

export const VerticalStepper = <T extends number | Steps>(props: TBasicStepperProps<T>) => {
    return <BasicStepper {...props} orientation="vertical" />;
};