import Breadcrumbs from "@components/Breadcrumbs";
import { Skeleton } from "@components/Loader";
import { useEffect, useState } from "react";
import usePageQuery from "../hooks/usePageQuery";
import { convertCamelToCapitalized } from "../../../src/utils";

const PageContainer = () => {
    const [isMounted, setMounted] = useState(false);
    const { currentPage, setPage } = usePageQuery();

    useEffect(() => {
        const loaderTimer = setTimeout(() => {
            setMounted(true);
        }, 1000);

        return () => {
            clearTimeout(loaderTimer);
        };
    }, []);

    // <BoxModelDemo />
    //                                 <div className="code-container">
    //                                     <div className="code-body">
    //                                         <span className="code-item comment"></span>
    //                                         <span className="code-item"></span>
    //                                     </div>
    //                                 </div>
    //                             </>

    if (!isMounted) {
        return (
            <Skeleton.Container direction="column">
                <Skeleton.Square rounded height={100} />
                <Skeleton.Square rounded height={400} />
                <Skeleton.Square rounded height={200} />
                <Skeleton.Square rounded height={200} />
            </Skeleton.Container>
        );
    }

    const crumbsData = [
        {
            content: "Home",
            href: "/",
        },
        ...currentPage.map((page: string) => {
            return {
                content: convertCamelToCapitalized(page),
                href: `/page?=${page}`,
            };
        }),
    ];

    return (
        <div className="page-container">
            <Breadcrumbs links={crumbsData} />
        </div>
    );
};

export default PageContainer;
