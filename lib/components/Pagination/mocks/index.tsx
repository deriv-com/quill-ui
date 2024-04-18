import { useMemo, useState } from "react";
import Pagination from "@components/Pagination";
import { TPaginationEvent } from "@components/Pagination/types";
import "./mocks.scss";

type TData = {
    first_name: string;
    last_name: string;
    email: string;
    id: number;
};

type PostProps = {
    data: TData;
};

const Post = ({ data }: PostProps) => (
    <div className="mock-table">
        <small>{data.id}</small>
        <h3>
            <b>First Name:</b> {data.first_name}
        </h3>
        <h4>
            <b>Last Name:</b> {data.last_name}
        </h4>
        <h4>
            <b>Email ID:</b> {data.email}
        </h4>
    </div>
);

const Blog = ({ posts }: { posts: Array<TData> }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const contentPerPage = 7;

    const paginatedData = useMemo(() => {
        const startIndex = currentPage * contentPerPage - contentPerPage;
        const endIndex = startIndex + contentPerPage;
        return posts?.slice(startIndex, endIndex);
    }, [currentPage, contentPerPage, posts]);

    const handlePagination = ({ currentPage }: TPaginationEvent) => {
        setCurrentPage(currentPage);
    };

    return (
        <div>
            <section className="mock-section">
                {paginatedData?.map((data) => (
                    <Post key={data?.id} data={data} />
                ))}
            </section>
            <Pagination
                contentPerPage={contentPerPage}
                onClickPagination={handlePagination}
                variant="number"
                contentLength={posts?.length}
            />
        </div>
    );
};

export default Blog;
