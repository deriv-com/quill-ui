import { StringOrNumber } from "@types";
import { CustomTypes } from ".";

type HandlerFunction = (input: StringOrNumber) => string;

type CustomTypeObjectType = {
    [key: string]: HandlerFunction;
};

export const barrierHandler: HandlerFunction = (value) => {
    const clean = (input: StringOrNumber): string => {
        const strInput = String(input);

        // Remove any character that isn't +, -, digit, or dot
        let cleaned = strInput.replace(/[^+\-\d.]/g, "");

        // Ensure + or - is only at the start
        if (/^[+-]/.test(cleaned)) {
            cleaned = cleaned.replace(/(?!^)[+-]/g, "");
        }

        // Ensure that if there is a dot, no additional dots are allowed
        if (cleaned.includes(".")) {
            const parts = cleaned.split(".");
            cleaned = parts.shift() + "." + parts.join("");
        }

        return cleaned;
    };

    const cleanedInput = clean(value);
    const regex = /^[+-]?(\d+(\.\d*)?|\.\d+)?$/;

    const match = cleanedInput.match(regex);
    if (match) {
        return match[0];
    }

    return "";
};

export const commaRemovalHandler: HandlerFunction = (value) => {
    const cleaned = String(value).replace(",", ".");
    return barrierHandler(cleaned);
};

export const CustomTypeObject: CustomTypeObjectType = {
    barrier: barrierHandler,
    commaRemoval: commaRemovalHandler,
} as const;

export const customHandlers = (
    type: CustomTypes,
    value: string | number,
): string => CustomTypeObject[type](value);
