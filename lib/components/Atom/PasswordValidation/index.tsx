import { TValidationMessage } from "@components/Input/base";
import {
    LabelPairedCircleCaptionRegularIcon,
    LabelPairedCircleCheckCaptionFillIcon,
    LabelPairedCircleXmarkCaptionFillIcon,
} from "@deriv/quill-icons/LabelPaired";
import React from "react";
import "./password-validation.scss";
import { CaptionText } from "@components/Typography";

export const PasswordStrengthValidation = ({
    status,
    validationMessage,
}: TValidationMessage) => {
    return (
        <div className="validation_message">
            {status === "success" ? (
                <LabelPairedCircleCheckCaptionFillIcon fill="var(--component-textIcon-statusNormal-success)" />
            ) : status === "error" ? (
                <LabelPairedCircleXmarkCaptionFillIcon fill="var(--component-textIcon-statusNormal-danger)" />
            ) : (
                <LabelPairedCircleCaptionRegularIcon fill="var(--component-textIcon-normal-default)" />
            )}
            <CaptionText className={`validation_message__status--${status}`}>
                {validationMessage}
            </CaptionText>
        </div>
    );
};

export default PasswordStrengthValidation;
