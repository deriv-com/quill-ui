import { useMemo } from "react";
export const DOTS = "...";

const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => index + start);
};

type UsePaginationRangeProps = {
    currentPage: number;
    totalPageCount: number;
    variant: "number" | "bullet";
};

export const UsePaginationRange = ({
    currentPage,
    totalPageCount,
    variant,
}: UsePaginationRangeProps) => {
    const TOTAL_PAGES_TO_DISPLAY = 5;
    const FIRST_PAGE_INDEX = 1;
    const START_END_PAGE_COUNT = 2;
    const paginationRange: Array<number | "..."> = useMemo(() => {
        if (variant === "bullet") {
            return range(FIRST_PAGE_INDEX, totalPageCount);
        }

        if (totalPageCount >= TOTAL_PAGES_TO_DISPLAY + 1) {
            const leftSiblingIndex = Math.max(currentPage - 1, 1);
            const rightSiblingIndex = Math.min(currentPage + 1, totalPageCount);
            const shouldShowLeftDots = leftSiblingIndex > START_END_PAGE_COUNT;
            const shouldShowRightDots =
                rightSiblingIndex <= totalPageCount - START_END_PAGE_COUNT;

            if (!shouldShowLeftDots && shouldShowRightDots) {
                const leftRange = range(
                    FIRST_PAGE_INDEX,
                    TOTAL_PAGES_TO_DISPLAY,
                );
                return [...leftRange, DOTS, totalPageCount];
            }

            if (shouldShowLeftDots && !shouldShowRightDots) {
                const rightRange = range(
                    totalPageCount - TOTAL_PAGES_TO_DISPLAY + 1,
                    totalPageCount,
                );
                return [FIRST_PAGE_INDEX, DOTS, ...rightRange];
            }

            if (shouldShowLeftDots && shouldShowRightDots) {
                const middleRange = range(leftSiblingIndex, rightSiblingIndex);
                return [
                    FIRST_PAGE_INDEX,
                    DOTS,
                    ...middleRange,
                    DOTS,
                    totalPageCount,
                ];
            }
        }

        return range(FIRST_PAGE_INDEX, totalPageCount);
    }, [currentPage, totalPageCount, variant]);
    return paginationRange;
};
