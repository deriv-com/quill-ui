import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import WheelPicker from "..";

const mockData = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
];

describe("WheelPicker", () => {
    let setSelectedValue: (value: string | number) => void;
    const handleKeyDown = jest.fn();
    const renderComponent = () =>
        render(
            <div
                style={{
                    height: "240px",
                }}
            >
                <WheelPicker
                    data={mockData}
                    selectedValue="Option 1"
                    setSelectedValue={setSelectedValue}
                    handleKeyDown={handleKeyDown}
                />
                ,
            </div>,
        );
    const observe = jest.fn();
    beforeEach(() => {
        setSelectedValue = jest.fn();
        global.ResizeObserver = jest.fn(() => ({
            observe,
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        })) as jest.Mock;
    });

    test("should match snapshot", () => {
        const { asFragment } = renderComponent();

        expect(asFragment()).toMatchSnapshot();
    });
    test("renders WheelPicker with data", () => {
        renderComponent();

        mockData.forEach((item) => {
            expect(screen.getByText(item.value)).toBeInTheDocument();
        });
    });

    test("should call setSelectedValue when scrolled", () => {
        renderComponent();

        const listbox = screen.getByRole("listbox");
        fireEvent.scroll(listbox, { target: { scrollTop: 50 } });

        expect(setSelectedValue).toHaveBeenCalledWith("Option 2");
    });

    test("should handle keydown events", () => {
        renderComponent();

        fireEvent.keyDown(screen.getByText("Option 1"), { key: "ArrowDown" });

        expect(handleKeyDown).toHaveBeenCalled();
    });

    test("should adjust padding on resize", () => {
        renderComponent();

        expect(observe).toHaveBeenCalled();
    });
});
