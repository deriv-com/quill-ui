import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaginationButton from "@components/Pagination/base";

jest.mock("@deriv/quill-icons/Standalone", () => ({
    StandaloneEllipsisRegularIcon: () => <div>...</div>,
    StandaloneCircleFillIcon: () => <div>O</div>,
}));

describe("PaginationButton", () => {
    it("should render bullet icons when variant is bullet", () => {
        render(
            <PaginationButton
                currentPage={2}
                handleOnClick={jest.fn()}
                pageNumber={1}
                variant="bullet"
            />,
        );

        const elBullet = screen.getByRole("button", { name: /Go to page 1/i });

        expect(elBullet).toBeInTheDocument();
    });

    it("should render ellipsis icon when page number is DOTS", () => {
        render(
            <PaginationButton
                currentPage={2}
                handleOnClick={jest.fn()}
                pageNumber={"..."}
                variant="number"
            />,
        );

        const elEllipsis = screen.getByRole("button", {
            name: /Hidden pages/i,
        });

        expect(elEllipsis).toBeInTheDocument();
        expect(elEllipsis).toBeDisabled();
    });

    it("should render page number when variant is number", () => {
        render(
            <PaginationButton
                currentPage={2}
                handleOnClick={jest.fn()}
                pageNumber={1}
                variant="number"
            />,
        );

        const elPageNumber = screen.getByRole("button", {
            name: /Go to page 1/i,
        });

        expect(elPageNumber).toBeInTheDocument();
        expect(elPageNumber.innerHTML).toMatch("1");
    });

    it("should call handleOnClick when clicked", async () => {
        const handleOnClick = jest.fn();
        const pageNumber = 3;

        render(
            <PaginationButton
                currentPage={2}
                handleOnClick={handleOnClick}
                pageNumber={pageNumber}
                variant="number"
            />,
        );

        const elPageNumber = screen.getByRole("button", {
            name: /Go to page 3/i,
        });

        await userEvent.click(elPageNumber);

        expect(handleOnClick).toHaveBeenCalledWith(pageNumber.toString());
    });
});
