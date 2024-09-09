import Breadcrumbs from "@components/Breadcrumbs";
import { Skeleton } from "@components/Loader";
import { ReactNode, useEffect, useState } from "react";
import usePageQuery from "../hooks/usePageQuery";
import { convertCamelToCapitalized, unslugify } from "../../../src/utils";
import { Heading } from "@components/Typography";
import CoreTokenIntroduction from "../pages/core-token-intro";
import SemanticTokenIntroduction from "../pages/semantic-token-intro";
import ComponentTokenIntroduction from "../pages/component-token-intro";
import Home from "../pages/home";
import Color from "../pages/color";
import BorderRadius from "../pages/border-radius";
import BorderWidth from "../pages/border-width";
import Elevation from "../pages/elevation";

type TPageRouter = { [key: string]: ReactNode };

const PageContainer = () => {
    const [isMounted, setMounted] = useState(false);
    const { currentPage, mainPage } = usePageQuery();

    useEffect(() => {
        const loaderTimer = setTimeout(() => {
            setMounted(true);
        }, 1000);

        return () => {
            clearTimeout(loaderTimer);
        };
    }, []);

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
                content: convertCamelToCapitalized(unslugify(page)),
                href: `/?page=${page}`,
            };
        }),
    ];

    console.log({
        mainPage,
    });

    const pageRouter: TPageRouter = {
        undefined: <Home />,
        core: <CoreTokenIntroduction />,
        semantic: <SemanticTokenIntroduction />,
        component: <ComponentTokenIntroduction />,
        "introduction-to-core-tokens": <CoreTokenIntroduction />,
        "introduction-to-semantic-tokens": <SemanticTokenIntroduction />,
        "introduction-to-component-tokens": <ComponentTokenIntroduction />,
        color: <Color />,
        borderRadius: <BorderRadius />,
        borderWidth: <BorderWidth />,
        elevation: <Elevation />,
    };

    return (
        <div className="page-container">
            <Breadcrumbs links={crumbsData} />
            {pageRouter[mainPage] || <Heading.H3>Page not found</Heading.H3>}
        </div>
    );
};

export default PageContainer;
