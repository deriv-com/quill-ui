import { DOTS } from "@hooks/usePaginationRange.tsx";
import { PaginationProps } from "@components/Pagination/types";
import "./pagination-base.scss";
import { CaptionText } from "@components/Typography";
import React from "react";
export interface PaginationButtonProps
    extends Pick<PaginationProps, "variant"> {
    pageNumber: number | string;
    currentPage: number;
    handleOnClick: (event: string | null) => void;
}

export const PaginationButton = ({
    currentPage,
    handleOnClick,
    pageNumber,
    variant = "number",
}: PaginationButtonProps) => {
    if (variant === "bullet") {
        return (
            <button
                onClick={() => handleOnClick(String(pageNumber))}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={currentPage === pageNumber}
                className="variant__bullet"
            ></button>
        );
    }

    if (pageNumber === DOTS) {
        return (
            <button disabled aria-label="Hidden pages" className="hidden_pages">
                <p className="hidden_pages-dots">{DOTS}</p>
            </button>
        );
    }

    return (
        <button
            aria-label={`Go to page ${pageNumber}`}
            aria-current={currentPage === pageNumber}
            onClick={(e) => handleOnClick(e.currentTarget.textContent)}
            className="variant__number"
        >
            <CaptionText
                className="number-text"
                aria-current={currentPage === pageNumber}
            >
                {pageNumber}
            </CaptionText>
        </button>
    );
};

export default PaginationButton;
