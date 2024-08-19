import React, { useEffect, useState } from "react";
import { Badge, IconButton, Skeleton, Text } from "../../lib/main";

import { loadVersionData, TypeData } from "../utils";
import BoxModelDemo from "./components/box-model-demo";
import VaultHeader from "./layout/header";
import {
    Categories,
    categorizeVariables,
    ProcessedObject,
} from "./helpers/categorizer";
import usePageQuery from "./hooks/usePageQuery";
import PageContainer from "./components/page-container";

const Vault = () => {
    const [variables, setVariables] = useState<Categories>({});
    const [currentVersion, setCurrentVersion] = useState("");
    const [data, setData] = useState<TypeData | null>(null);
    const { currentPage, setPage } = usePageQuery();

    useEffect(() => {
        async function fetchData() {
            const loadedData = await loadVersionData(currentVersion);
            setData(loadedData);
        }
        fetchData();
    }, [currentVersion]);

    useEffect(() => {
        if (data) {
            const categorizedVars = categorizeVariables(data.cssVariables);
            setVariables(categorizedVars);
        }
    }, [data]);

    return (
        <section className="vault-section">
            <div className="vault-container">
                <VaultHeader onVersionChange={(e) => setCurrentVersion(e)} />
                <div className="constrained-container">
                    <div className="vault-body">
                        <div className="vault-sidebar">
                            <div className="sidebar-item-box">
                                <Text bold>Introduction</Text>
                                <span
                                    onClick={() =>
                                        setPage(["introduction", "core"])
                                    }
                                    className={`item-box ${currentPage[0] === "introduction" && currentPage[1] === "core" ? "active" : ""}`}
                                >
                                    <Text size="sm">Core Tokens</Text>
                                </span>
                                <span
                                    onClick={() =>
                                        setPage(["introduction", "semantic"])
                                    }
                                    className={`item-box ${currentPage[0] === "introduction" && currentPage[1] === "semantic" ? "active" : ""}`}
                                >
                                    <Text size="sm">Semantic Tokens</Text>
                                </span>
                            </div>
                            {Object.keys(variables).map((varKeys) => {
                                const categoryItems: ProcessedObject =
                                    variables[varKeys];
                                return (
                                    <div
                                        className="sidebar-item-box"
                                        key={`category-${varKeys}`}
                                    >
                                        <Text bold>{varKeys}</Text>
                                        {Object.keys(categoryItems).map(
                                            (itemKey) => {
                                                const item =
                                                    categoryItems[itemKey];
                                                const key = item.key;
                                                const isActive =
                                                    currentPage?.[0] ===
                                                        varKeys &&
                                                    currentPage?.[1] === key;

                                                return (
                                                    <span
                                                        className={`item-box ${isActive ? "active" : ""}`}
                                                        key={`${varKeys}-${itemKey}`}
                                                        onClick={() =>
                                                            setPage([
                                                                varKeys,
                                                                key,
                                                            ])
                                                        }
                                                    >
                                                        <Text size="sm">
                                                            {item.value}
                                                        </Text>
                                                        <Text
                                                            size="sm"
                                                            className="item-count"
                                                        >
                                                            (
                                                            {
                                                                Object.keys(
                                                                    item.tokens,
                                                                ).length
                                                            }
                                                            )
                                                        </Text>
                                                    </span>
                                                );
                                            },
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="vault-content">
                            <PageContainer />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Vault;
