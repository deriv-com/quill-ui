import { isValidElement } from "react";

export const KEY = {
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
    ARROW_DOWN: "ArrowDown",
    ENTER: "Enter",
    SPACE: " ",
    TAB: "Tab",
    ESCAPE: "Escape",
};

export const reactNodeToString = (reactNode: React.ReactNode): string => {
    let string = "";
    if (typeof reactNode === "string") {
        string = reactNode;
    } else if (typeof reactNode === "number") {
        string = reactNode.toString();
    } else if (reactNode instanceof Array) {
        reactNode.forEach((child) => {
            string += reactNodeToString(child);
        });
    } else if (isValidElement(reactNode)) {
        string += reactNodeToString(reactNode.props.children);
    }
    return string;
};

const toFixedWithoutRounding = (value: number, decimals: number) => {
    const stringified_value = value.toString();
    const result = stringified_value.slice(
        0,
        stringified_value.indexOf(".") + decimals + 1,
    );
    return Number(result);
};

export const getFormatValue = (
    value: number | string,
    decimals: number,
    shouldRound = true,
) => {
    if (!value) return value;

    const inputValue = value.toString();
    const parts = inputValue.split(".");

    if (parts.length < 2) return value;
    if (parts[1].length < decimals) return value;

    const numValue = Number(value);

    if (isNaN(numValue)) return value;

    return shouldRound
        ? numValue.toFixed(decimals)
        : toFixedWithoutRounding(numValue, decimals);
};
