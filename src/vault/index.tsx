import React, { useEffect, useState } from "react";
import { Text } from "../../lib/main";
import VaultHeader from "./layout/header";
import { ProcessedObject } from "./helpers/categorizer";
import usePageQuery from "./hooks/usePageQuery";
import PageContainer from "./components/page-container";
import { LabelPairedChevronDownSmBoldIcon } from "@deriv/quill-icons/LabelPaired";
import { useVersion } from "./hooks/useVersion";

const Vault = () => {
    const [activeCollapse, setActiveCollapse] = useState(0);
    const { currentPage, setPage } = usePageQuery();
    const { variables } = useVersion();

    const toggleCollapse = (e: number) =>
        setActiveCollapse(activeCollapse === e ? -1 : e);

    return (
        <section className="vault-section">
            <div className="vault-container">
                <VaultHeader />
                <div className="constrained-container">
                    <div className="vault-body">
                        <div className="vault-sidebar">
                            <div className="sidebar-item-box">
                                <Text bold>Introduction</Text>
                                <span
                                    onClick={() =>
                                        setPage(["introduction-to-core-tokens"])
                                    }
                                    className={`item-box ${currentPage[0] === "introduction-to-core-tokens" || currentPage[0] === "core" ? "active" : ""}`}
                                >
                                    <Text size="sm">Core Tokens</Text>
                                </span>
                                <span
                                    onClick={() =>
                                        setPage([
                                            "introduction-to-semantic-tokens",
                                        ])
                                    }
                                    className={`item-box ${currentPage[0] === "introduction-to-semantic-tokens" || currentPage[0] === "semantic" ? "active" : ""}`}
                                >
                                    <Text size="sm">Semantic Tokens</Text>
                                </span>
                                <span
                                    onClick={() =>
                                        setPage([
                                            "introduction-to-component-tokens",
                                        ])
                                    }
                                    className={`item-box ${currentPage[0] === "introduction-to-component-tokens" || currentPage[0] === "component" ? "active" : ""}`}
                                >
                                    <Text size="sm">Component Tokens</Text>
                                </span>
                            </div>
                            {Object.keys(variables).map((varKeys, varIndex) => {
                                const categoryItems: ProcessedObject =
                                    variables[varKeys];
                                return (
                                    <div
                                        className="sidebar-item-box"
                                        key={`category-${varKeys}`}
                                    >
                                        <Text bold>
                                            <span
                                                className={`collapse-header ${varIndex === activeCollapse ? "active" : ""}`}
                                                onClick={() =>
                                                    toggleCollapse(varIndex)
                                                }
                                            >
                                                {varKeys}
                                                <LabelPairedChevronDownSmBoldIcon className="caret-icon" />
                                            </span>
                                        </Text>
                                        <div
                                            className={`collapse-body ${varIndex === activeCollapse ? "active" : ""}`}
                                        >
                                            {Object.keys(categoryItems).map(
                                                (itemKey) => {
                                                    const item =
                                                        categoryItems[itemKey];
                                                    const key = item.key;
                                                    const isActive =
                                                        currentPage?.[0] ===
                                                            varKeys &&
                                                        currentPage?.[1] ===
                                                            key;

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
