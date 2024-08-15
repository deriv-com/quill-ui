import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import TimeWheelPickerContainer from "..";
import { TimeWheelPickerContainerProps } from "lib/main";

let mockSetSelectedTime = jest.fn();
let mockClose = jest.fn();
let mockSetSelectedValue = jest.fn();

const renderComponent = (args: TimeWheelPickerContainerProps) =>
    render(
        <div
            style={{
                height: "240px",
            }}
        >
            <TimeWheelPickerContainer
                {...args}
                close={mockClose}
                setSelectedValue={mockSetSelectedValue}
                setSelectedTime={mockSetSelectedTime}
            />
            ,
        </div>,
    );
describe("GenericTimeWheelPickerContainer", () => {
    global.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };

    HTMLElement.prototype.scrollIntoView = jest.fn();

    beforeEach(() => {
        mockClose = jest.fn();
        mockSetSelectedTime = jest.fn();
        mockSetSelectedValue = jest.fn();
    });

    it("renders correctly", () => {
        const { asFragment } = renderComponent({ is12Hour: true });
        expect(asFragment()).toMatchSnapshot();
    });

    it("handles ArrowRight and ArrowLeft keydown events correctly", () => {
        const { getAllByRole } = renderComponent({ is12Hour: true });
        const wheelPickers = getAllByRole("listbox");

        fireEvent.keyDown(wheelPickers[0], { key: "ArrowRight" });
        expect(mockSetSelectedTime).toHaveBeenCalledTimes(3);

        fireEvent.keyDown(wheelPickers[1], { key: "ArrowLeft" });
        expect(mockSetSelectedTime).toHaveBeenCalledTimes(3);

        fireEvent.keyDown(wheelPickers[2], { key: "Escape" });
        expect(mockClose).toHaveBeenCalledTimes(0);
    });

    it("should select elements on scroll", async () => {
        const { getAllByRole } = renderComponent({ is12Hour: true });
        const wheelPickers = getAllByRole("listbox");

        waitFor(() => {
            fireEvent.scroll(wheelPickers[0], { target: { scrollTop: 48 } });
        });
        expect(mockSetSelectedTime).toHaveBeenNthCalledWith(4, "2:0 AM");
    });

    it("should render in 24 hour format", async () => {
        const { getAllByRole } = renderComponent({ is12Hour: false });
        const wheelPickers = getAllByRole("listbox");
        expect(wheelPickers.length).toBe(2);
    });
});
