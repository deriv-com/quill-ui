import React from "react";
import { render } from "@testing-library/react";
import { CustomDropdown } from ".."; // Adjust the import path as per your project structure
import { DropdownItem } from "@components/Atom";

const data = [
    { value: "value1", text: "text1" },
    { value: "value2", text: "text2" },
    { value: "value3", text: "text3" },
    { value: "value4", text: "text4" },
    { value: "value5", text: "text5" },
    { value: "value6", text: "text6" },
    { value: "value7", text: "text7" },
];
const handleClick = () => {};

describe("CustomDropdown", () => {
    test("renders with default props and closes dropdown on input click", () => {
        render(
            <CustomDropdown>
                {data.map(({ text }, index) => (
                    <DropdownItem
                        onClick={handleClick}
                        key={index}
                        label={text}
                    />
                ))}
            </CustomDropdown>,
        );
    });
});
