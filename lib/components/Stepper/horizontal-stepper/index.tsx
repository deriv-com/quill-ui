import React from 'react';
import { BasicStepper } from '../../index';
import { TBasicStepperProps } from '../types';

export const HorizontalStepper = (props: TBasicStepperProps) => {
    return <BasicStepper {...props} orientation="vertical" />;
};