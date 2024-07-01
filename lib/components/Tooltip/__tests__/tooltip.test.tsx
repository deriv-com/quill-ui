import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "../index";

describe("Tooltip Component", () => {
    it("renders correctly with default props", () => {
        render(
            <Tooltip as="button" tooltipContent="Tooltip text">
                Hover me
            </Tooltip>,
        );
        expect(screen.getByRole("button")).toHaveTextContent("Hover me");
    });
    it("renders correctly when variant rich is passed", () => {
        render(
            <Tooltip
                as="button"
                tooltipContent="Tooltip text"
                variant="rich"
                title="Title"
                actionText="label"
            >
                Hover me
            </Tooltip>,
        );
        expect(screen.getByRole("button")).toHaveTextContent("Hover me");
    });

    it("displays tooltip on hover", async () => {
        render(
            <Tooltip as="button" tooltipContent="Tooltip text">
                Hover me
            </Tooltip>,
        );
        const button = screen.getByRole("button");
        await act(async () => {
            await userEvent.hover(button);
        });
        expect(await screen.findByText("Tooltip text")).toBeVisible();
        await act(async () => {
            await userEvent.unhover(button);
        });
        expect(screen.queryByText("Tooltip text")).not.toBeInTheDocument();
    });

    it("accepts and applies custom tooltip position", async () => {
        render(
            <Tooltip
                as="button"
                tooltipContent="Tooltip text"
                tooltipPosition="bottom"
            >
                Hover me
            </Tooltip>,
        );
        await act(async () => {
            await userEvent.hover(screen.getByRole("button"));
        });
        expect(await screen.findByText("Tooltip text")).toBeVisible();
    });

    it("accepts and applies tooltip popover alignment", async () => {
        render(
            <Tooltip
                as="button"
                tooltipContent="Tooltip text"
                popoverAlign="start"
                tooltipPosition="bottom"
            >
                Hover me
            </Tooltip>,
        );
        await act(async () => {
            await userEvent.hover(screen.getByRole("button"));
        });
        expect(await screen.findByText("Tooltip text")).toBeVisible();
    });

    it("renders correctly with as='a'", () => {
        render(
            <Tooltip
                as="a"
                tooltipContent="Tooltip text"
                href="https://test.com"
            >
                Hover me
            </Tooltip>,
        );
        expect(screen.getByRole("link")).toHaveTextContent("Hover me");
    });
});
