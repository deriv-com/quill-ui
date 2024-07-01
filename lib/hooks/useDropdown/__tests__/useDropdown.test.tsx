import { renderHook, act, render } from "@testing-library/react";
import useDropdown from ".."; // Adjust the path to your actual file
import userEvent from "@testing-library/user-event";

describe("useDropdown", () => {
    test("should initialize as closed", () => {
        const { result } = renderHook(() => useDropdown());
        const { isOpen } = result.current;
        expect(isOpen).toBe(false);
    });

    test("should close the dropdown when open and close is called", () => {
        const { result } = renderHook(() => useDropdown());

        act(() => {
            result.current.open();
        });

        expect(result.current.isOpen).toBe(true);

        act(() => {
            result.current.close();
        });
        expect(result.current.isOpen).toBe(false);
    });

    test("should close the dropdown when clicking outside", async () => {
        const { result } = renderHook(() => useDropdown());

        const { getByText } = render(
            <div>
                <div ref={result.current.ref} onClick={result.current.open}>
                    inside
                </div>
                <button>outside</button>
            </div>,
        );
        await act(async () => {
            await userEvent.click(getByText("inside"));
        });
        expect(result.current.isOpen).toBe(true);
        await act(async () => {
            await userEvent.click(getByText("outside"));
        });
        expect(result.current.isOpen).toBe(false);
    });
});
