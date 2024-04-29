import React, { ComponentProps } from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import SearchField from "..";

jest.mock("@deriv/quill-icons", () => ({
    ...jest.requireActual("@deriv/quill-icons"),
    StandaloneCircleCheckBoldIcon: jest.fn(() => "mockedSuccessIcon"),
    StandaloneSearchRegularIcon: jest.fn(() => "mockedSearchIcon"),
    StandaloneTriangleExclamationBoldIcon: jest.fn(() => "mockedErrorIcon"),
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
    it("updates value correctly on input change", () => {
        const onChangeMock = jest.fn();
        const { container } = renderSearchField({ onChange: onChangeMock });
        const searchElement = screen.getByPlaceholderText("Search");

        act(() => {
            fireEvent.change(searchElement, { target: { value: "test" } });
        });

        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({
                    value: "test",
                }),
            }),
        );
        expect(container).toMatchSnapshot();
    });
    it("renders clear icon when value is not empty and clear icon should be removed after click", () => {
        const { container } = renderSearchField({ value: "test" });
        const mockedClearIcon = screen.getByText("mockedClearIcon");
        expect(mockedClearIcon).toBeInTheDocument();

        act(() => fireEvent.click(mockedClearIcon));
        
        expect(mockedClearIcon).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it('renders success status icon when status prop is "success"', () => {
        const { container } = renderSearchField({ status: "success" });
        const mockedSuccessIcon = screen.getByText("mockedSuccessIcon");
        expect(mockedSuccessIcon).toBeInTheDocument();
        expect(mockedSuccessIcon).toHaveClass("status-icon--success");
        expect(container).toMatchSnapshot();
    });
    it('renders error status icon when status prop is "error"', () => {
        const { container } = renderSearchField({ status: "error" });
        const mockedErrorIcon = screen.getByText("mockedErrorIcon");
        expect(mockedErrorIcon).toBeInTheDocument();
        expect(mockedErrorIcon).toHaveClass("status-icon--error");
        expect(container).toMatchSnapshot();
    });
    it('renders leftStatusMessage when prop is given', () => {
      const { container } = renderSearchField({ leftStatusMessage: "mocked status message" });
      const statusMessage = screen.getByText('mocked status message')
      expect(statusMessage).toBeInTheDocument();
      expect(statusMessage).toHaveClass('message__container__text');
      expect(container).toMatchSnapshot();
    })
});
