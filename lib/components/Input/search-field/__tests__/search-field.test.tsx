import React, { ComponentProps } from "react";
import { act, render, screen } from "@testing-library/react";
import SearchField from "..";
import userEvent from "@testing-library/user-event";

jest.mock("@deriv/quill-icons", () => ({
    ...jest.requireActual("@deriv/quill-icons"),
    StandaloneSearchRegularIcon: jest.fn(() => "mockedSearchIcon"),
    StandaloneCircleXmarkFillIcon: jest.fn(() => "mockedClearIcon"),
}));

describe("<SearchField />", () => {
    const renderSearchField = (
        props: ComponentProps<typeof SearchField> = {},
    ) => {
        return render(<SearchField {...props} />);
    };
    it("renders correctly with default props", () => {
        const { container } = renderSearchField();
        expect(screen.getByText("mockedSearchIcon")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it("updates value correctly on input change", async () => {
        const onChangeMock = jest.fn();
        const { container } = renderSearchField({ onChange: onChangeMock });
        const searchElement = screen.getByPlaceholderText("Search");
        await act(async () => {
            await userEvent.type(searchElement, "test");
        });

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({
                    value: "test",
                }),
            }),
        );
        expect(container).toMatchSnapshot();
    });
    it("renders clear icon when value is not empty and clear icon should be removed after click", async () => {
        const { container } = renderSearchField({ value: "test" });
        const mockedClearIcon = screen.getByText("mockedClearIcon");
        expect(mockedClearIcon).toBeInTheDocument();
        await act(async () => {
            await userEvent.click(mockedClearIcon);
        });
        expect(mockedClearIcon).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it('renders success status icon when status prop is "success"', () => {
        const { container } = renderSearchField({ status: "success" });
        expect(container).toMatchSnapshot();
    });
    it('renders error status icon when status prop is "error"', () => {
        const { container } = renderSearchField({ status: "error" });
        expect(container).toMatchSnapshot();
    });
    it("renders leftStatusMessage when prop is given", () => {
        const { container } = renderSearchField({
            message: "mocked status message",
        });
        const statusMessage = screen.getByText("mocked status message");
        expect(statusMessage).toBeInTheDocument();
        expect(statusMessage).toHaveClass("message__container__text");
        expect(container).toMatchSnapshot();
    });
});
