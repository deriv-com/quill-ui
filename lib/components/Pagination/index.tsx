import { useEffect, useMemo, useState } from "react";
import {
    StandaloneChevronLeftRegularIcon,
    StandaloneChevronRightRegularIcon,
} from "@deriv/quill-icons/Standalone";
import { PaginationProps } from "@components/Pagination/types";
import { UsePaginationRange } from "@hooks/usePaginationRange";
import PaginationButton from "@components/Pagination/base";
import "./pagination.scss";
import clsx from "clsx";

export const Pagination = ({
    contentPerPage,
    contentLength,
    onClickPagination,
    variant = "number",
}: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPageCount = useMemo(() => {
        const dataToDisplay = contentPerPage ?? 1;
        return Math.ceil((contentLength ?? 0) / dataToDisplay);
    }, [contentLength, contentPerPage]);

    const paginationRange = UsePaginationRange({
        totalPageCount,
        currentPage,
        variant,
    });

    useEffect(() => {
        onClickPagination({ currentPage, totalPageCount });
    }, [currentPage, onClickPagination, totalPageCount]);

    const goToNextPage = () => setCurrentPage((page) => page + 1);

    const gotToPreviousPage = () => setCurrentPage((page) => page - 1);

    const changePage = (event: string | null) => {
        const pageNumber = Number(event);
        setCurrentPage(pageNumber);
    };

    return (
        <nav
            role="navigation"
            aria-label="Pagination Navigation"
            className="pagination__container"
        >
            <button
                onClick={gotToPreviousPage}
                disabled={currentPage === 1}
                className="pagination__chevron"
                aria-label="Go to Previous page"
            >
                <StandaloneChevronLeftRegularIcon
                    iconSize="sm"
                    className={clsx(
                        currentPage === 1
                            ? "pagination__chevron-disabled"
                            : "pagination__chevron-svg",
                    )}
                />
            </button>
            {paginationRange.map((pageNumber, index) => (
                <PaginationButton
                    key={`${pageNumber}_${index}`}
                    pageNumber={pageNumber}
                    variant={variant}
                    currentPage={currentPage}
                    handleOnClick={changePage}
                />
            ))}
            <button
                onClick={goToNextPage}
                disabled={currentPage === totalPageCount}
                className="pagination__chevron"
                aria-label="Go to Next page"
            >
                <StandaloneChevronRightRegularIcon
                    iconSize="sm"
                    className={clsx(
                        currentPage === totalPageCount
                            ? "pagination__chevron-disabled"
                            : "pagination__chevron-svg",
                    )}
                />
            </button>
        </nav>
    );
};

export default Pagination;
