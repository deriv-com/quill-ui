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

const toFixedWithoutRounding = (value: number, decimals: number) =>
    Math.floor(Math.pow(10, decimals) * value) / Math.pow(10, decimals);

export const getFormatValue = (value: number | string, decimals: number) => {
    if (!value) return value;

    const inputValue = value.toString();
    const parts = inputValue.split(".");

    if (parts.length < 2) return value;
    if (parts[1].length < decimals) return value;

    const numValue = Number(value);

    if (isNaN(numValue)) return value;

    return toFixedWithoutRounding(numValue, decimals);
};
