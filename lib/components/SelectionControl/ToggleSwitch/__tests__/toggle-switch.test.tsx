import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ToggleSwitch from "../index";

describe("ToggleSwitch", () => {
    it("should toggle from off to on", () => {
        const onChange = jest.fn();
        const { getByRole } = render(<ToggleSwitch onChange={onChange} />);
        const switchEl = getByRole("button");
        fireEvent.click(switchEl);
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it("should toggle from on to off when defaultChecked", () => {
        const onChange = jest.fn();
        const { getByRole } = render(
            <ToggleSwitch defaultChecked onChange={onChange} />,
        );
        const switchEl = getByRole("button");
        fireEvent.click(switchEl);
        expect(onChange).toHaveBeenCalledWith(false);
    });

    it("should not toggle when disabled", () => {
        const onChange = jest.fn();
        const { getByRole } = render(
            <ToggleSwitch disabled onChange={onChange} />,
        );
        const switchEl = getByRole("button");
        fireEvent.click(switchEl);
        expect(onChange).not.toHaveBeenCalled();
    });

    it("should be focusable and trigger onFocus and onBlur", () => {
        const onFocus = jest.fn();
        const onBlur = jest.fn();
        const { getByRole } = render(
            <ToggleSwitch onFocus={onFocus} onBlur={onBlur} />,
        );
        const switchEl = getByRole("button");
        fireEvent.focus(switchEl);
        expect(onFocus).toHaveBeenCalled();
        fireEvent.blur(switchEl);
        expect(onBlur).toHaveBeenCalled();
    });

    it("renders correctly with default props", () => {
        const { asFragment } = render(<ToggleSwitch onChange={() => {}} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("toggles from off to on and matches snapshot", () => {
        const onChange = jest.fn();
        const { getByRole, asFragment } = render(
            <ToggleSwitch onChange={onChange} />,
        );
        fireEvent.click(getByRole("button"));
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders correctly when disabled", () => {
        const { asFragment } = render(
            <ToggleSwitch disabled onChange={() => {}} />,
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders correctly when defaultChecked", () => {
        const { asFragment } = render(
            <ToggleSwitch defaultChecked onChange={() => {}} />,
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it("matches snapshot when focused", () => {
        const onFocus = jest.fn();
        const { getByRole, asFragment } = render(
            <ToggleSwitch onChange={() => {}} onFocus={onFocus} />,
        );
        const toggleElement = getByRole("button");
        fireEvent.focus(toggleElement);
        expect(onFocus).toHaveBeenCalled();
        expect(asFragment()).toMatchSnapshot();
    });

    it("matches snapshot when blurred", () => {
        const onBlur = jest.fn();
        const { getByRole, asFragment } = render(
            <ToggleSwitch onChange={() => {}} onBlur={onBlur} />,
        );
        const toggleElement = getByRole("button");
        fireEvent.focus(toggleElement);
        fireEvent.blur(toggleElement);
        expect(onBlur).toHaveBeenCalled();
        expect(asFragment()).toMatchSnapshot();
    });
});
