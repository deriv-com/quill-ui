import React from "react";
import { render, fireEvent } from "@testing-library/react";
import WheelPickerContainer from "..";

const mockData = [
    [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
    ],
    [
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
    ],
    [
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
    ],
];

let mockSetDataValues = jest.fn();
let mockClose = jest.fn();
let mockSetSelectedValue = jest.fn();

const renderComponent = () =>
    render(
        <div
            style={{
                height: "240px",
            }}
        >
            <WheelPickerContainer
                data={mockData}
                inputValues={["1", "4", "7"]}
                setInputValues={mockSetDataValues}
                close={mockClose}
                setSelectedValue={mockSetSelectedValue}
            />
            ,
        </div>,
    );
describe("GenericWheelPickerContainer", () => {
    global.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };

    HTMLElement.prototype.scrollIntoView = jest.fn();

    beforeEach(() => {
        mockSetDataValues = jest.fn();
        mockClose = jest.fn();
        mockSetSelectedValue = jest.fn();
    });

    it("renders correctly", () => {
        const { asFragment } = renderComponent();
        expect(asFragment()).toMatchSnapshot();
    });

    it("handles ArrowRight and ArrowLeft keydown events correctly", () => {
        const { getAllByRole } = renderComponent();
        const wheelPickers = getAllByRole("listbox");

        fireEvent.keyDown(wheelPickers[0], { key: "ArrowRight" });
        expect(mockSetDataValues).toHaveBeenCalledTimes(3);

        fireEvent.keyDown(wheelPickers[1], { key: "ArrowLeft" });
        expect(mockSetDataValues).toHaveBeenCalledTimes(3);

        fireEvent.keyDown(wheelPickers[2], { key: "Escape" });
        expect(mockClose).toHaveBeenCalledTimes(0);
    });

    it("should select elements on scroll", () => {
        const { getAllByRole } = renderComponent();

        const wheelPickers = getAllByRole("listbox");

        fireEvent.scroll(wheelPickers[0], { target: { scrollTop: 96 } });
        expect(mockSetDataValues).toHaveBeenNthCalledWith(4, 0, "3");
    });
});
