import { StringOrNumber } from "@types";
import { CustomTypes } from ".";

type HandlerFunction = (input: StringOrNumber) => string;

type CustomTypeObjectType = {
    [key: string]: HandlerFunction;
};

export const barrierHandler: HandlerFunction = (value) => {
    const clean = (input: StringOrNumber) => {
        // Remove any character that isn't +, -, digit, or dot
        let cleaned =
            // Ensure + or - is only at the start
            input + "".replace(/[^+\-\d.]/g, "").replace(/(?!^)[+-]/g, "");
        // Ensure there is only one dot
        const parts = cleaned.split(".");
        if (parts.length > 2) {
            cleaned = parts.shift() + "." + parts.join("");
        }
        return cleaned;
    };

    let cleanedInput = clean(value);
    const regex = /^[+-]?(\d+(\.\d*)?|\.\d+)?$/;

    // Remove invalid trailing characters
    while (cleanedInput && !regex.test(cleanedInput)) {
        cleanedInput = clean(cleanedInput.slice(0, -1));
    }

    return cleanedInput;
};

export const CustomTypeObject: CustomTypeObjectType = {
    barrier: barrierHandler,
} as const;

export const customHandlers = (
    type: CustomTypes,
    value: string | number,
): string => CustomTypeObject[type](value);
