import {
    StandaloneCircleFillIcon,
    StandaloneEllipsisRegularIcon,
} from "@deriv/quill-icons/Standalone";
import { DOTS } from "../../../hooks/usePaginationRange.tsx";
import { PaginationProps } from "../types";
import "./pagination-base.scss";
import { CaptionText } from "@components/Typography";

interface PaginationButtonProps extends Pick<PaginationProps, "variant"> {
    pageNumber: number | string;
    currentPage: number;
    handleOnClick: (event: string | null) => void;
}

/**
 * Component to render type of Pagination button based on variant and page number.
 * @name PaginationButton
 * @param {number} currentPage - Selected page number
 * @param {function} handleOnClick - Function to handle click action on the Pagination button
 * @param {number} pageNumber - Page number
 * @param {string} variant - Variant of Pagination
 */
const PaginationButton = ({
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
                className="variant__bullet-svg"
            >
                <StandaloneCircleFillIcon
                    iconSize="sm"
                    height={12}
                    width={12}
                />
            </button>
        );
    }

    if (pageNumber === DOTS) {
        return (
            <button disabled aria-label="Hidden pages" className="hidden_pages">
                <StandaloneEllipsisRegularIcon iconSize="sm" />
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
