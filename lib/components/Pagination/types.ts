export type PaginationVariant = "number" | "bullet";

export type TPaginationEvent = {
    currentPage: number;
    totalPageCount: number;
};

export interface PaginationProps {
    variant?: PaginationVariant;
    className?: string;
    contentPerPage?: number;
    contentLength?: number;
    initialPage?: number;
    hideChevron?: boolean;
    onClickPagination?: (props: TPaginationEvent) => void;
}
