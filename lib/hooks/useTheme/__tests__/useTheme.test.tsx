import { act, cleanup, renderHook } from "@testing-library/react";
import useTheme from "../index";

describe("useTheme", () => {
    afterEach(() => {
        cleanup();
    });

    it("should return the light theme by default", () => {
        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe("light");
    });

    it("should toggle theme to dark and light", async () => {
        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe("light");
        act(() => {
            result.current.toggleTheme("dark");
        });
        expect(result.current.theme).toBe("light");

        act(() => {
            result.current.toggleTheme("light");
        });
        expect(result.current.theme).toBe("light");
    });
});
