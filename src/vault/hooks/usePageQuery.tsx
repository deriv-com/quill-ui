import { useLocation, useNavigate } from "react-router-dom";

type UsePageQueryResult = {
    currentPage: string[];
    setPage: (pageArray: string[]) => void;
    mainPage: string;
};

const usePageQuery = (): UsePageQueryResult => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get the current page from the query params
    const getPageFromQuery = (): string[] => {
        const params = new URLSearchParams(location.search);
        const page = params.get("page");
        return page ? page.split("/") : [];
    };

    // Update the page in the URL
    const updatePageQuery = (pageArray: string[]): void => {
        const newPage = pageArray.join("/");
        const params = new URLSearchParams(location.search);
        params.set("page", newPage);
        navigate({ search: params.toString() });
    };

    const getLastPageItem = () => {
        const page = getPageFromQuery();

        return page[page.length - 1];
    };

    return {
        currentPage: getPageFromQuery(),
        mainPage: getLastPageItem(),
        setPage: updatePageQuery,
    };
};

export default usePageQuery;
