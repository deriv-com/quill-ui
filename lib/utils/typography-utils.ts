export const getTextDecoration = (
    italic: boolean,
    underlined: boolean,
): string => {
    if (italic && underlined) {
        return "italic-underline";
    } else if (italic) {
        return "italic";
    } else if (underlined) {
        return "underline";
    } else {
        return "default";
    }
};

export const getTextWeight = (bold: boolean): string => {
    return bold ? "bold" : "regular";
};
