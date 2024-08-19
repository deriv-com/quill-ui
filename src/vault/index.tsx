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

const Vault = () => {
    const [variables, setVariables] = useState<Categories>({});
    const [currentVersion, setCurrentVersion] = useState("");
    const [data, setData] = useState<TypeData | null>(null);

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
                                <Text size="sm" className="link">
                                    Core Tokens
                                </Text>
                                <Text size="sm" className="link">
                                    Semantic Tokens
                                </Text>
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
                                                return (
                                                    <span
                                                        className="item-box"
                                                        key={`${varKeys}-${itemKey}`}
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
                            {!data ? (
                                <Skeleton.Container>
                                    <Skeleton.Square
                                        rounded
                                        height={100}
                                        width={200}
                                    />
                                    <Skeleton.Square
                                        rounded
                                        height={100}
                                        width={200}
                                    />
                                    <Skeleton.Square
                                        rounded
                                        height={100}
                                        width={200}
                                    />
                                    <Skeleton.Square
                                        rounded
                                        height={100}
                                        width={200}
                                    />
                                    <Skeleton.Square
                                        rounded
                                        height={100}
                                        width={200}
                                    />
                                </Skeleton.Container>
                            ) : (
                                <>
                                    <BoxModelDemo />
                                    <div className="code-container">
                                        <div className="code-body">
                                            <span className="code-item comment"></span>
                                            <span className="code-item"></span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Vault;
