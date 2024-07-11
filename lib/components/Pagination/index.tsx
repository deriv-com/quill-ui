import { useEffect, useMemo, useState } from "react";
import {
    StandaloneChevronLeftRegularIcon,
    StandaloneChevronRightRegularIcon,
} from "@deriv/quill-icons/Standalone";
import { PaginationProps } from "@components/Pagination/types";
import { UsePaginationRange } from "@hooks/usePaginationRange";
import PaginationButton from "@components/Pagination/base";
import clsx from "clsx";
import { IconButton } from "@components/Button";
import "./pagination.scss";

export const Pagination = ({
    contentPerPage,
    contentLength,
    onClickPagination,
    variant = "number",
    hideChevron,
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
    const handleKeyPress = (event: { key: string }) => {
        if (event.key === "ArrowLeft" && currentPage !== 1) {
            gotToPreviousPage();
        } else if (
            event.key === "ArrowRight" &&
            currentPage !== totalPageCount
        ) {
            goToNextPage();
        }
    };
    return (
        <nav
            role="navigation"
            aria-label="Pagination Navigation"
            className="pagination__container"
            onKeyDown={handleKeyPress}
            tabIndex={0}
        >
            {!hideChevron && (
                <IconButton
                    color="black"
                    icon={
                        <StandaloneChevronLeftRegularIcon
                            iconSize="sm"
                            className={clsx(
                                currentPage === 1
                                    ? "pagination__chevron-disabled"
                                    : "pagination__chevron-svg",
                            )}
                        />
                    }
                    className="pagination__chevron"
                    aria-label="Go to Previous page"
                    onClick={gotToPreviousPage}
                    disabled={currentPage === 1}
                    size="sm"
                    variant="tertiary"
                />
            )}
            {paginationRange.map((pageNumber, index) => (
                <PaginationButton
                    key={`${pageNumber}_${index}`}
                    pageNumber={pageNumber}
                    variant={variant}
                    currentPage={currentPage}
                    handleOnClick={changePage}
                />
            ))}
            {!hideChevron && (
                <IconButton
                    color="black"
                    icon={
                        <StandaloneChevronRightRegularIcon
                            iconSize="sm"
                            className={clsx(
                                currentPage === totalPageCount
                                    ? "pagination__chevron-disabled"
                                    : "pagination__chevron-svg",
                            )}
                        />
                    }
                    className="pagination__chevron"
                    aria-label="Go to Next page"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPageCount}
                    size="sm"
                    variant="tertiary"
                />
            )}
        </nav>
    );
};

export default Pagination;
