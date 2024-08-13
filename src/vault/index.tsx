import React, { useEffect, useState } from "react";
import { Button, Divider, DropdownItem, Skeleton, Tab } from "../../lib/main";
import {
    StandaloneGlobeRegularIcon,
    StandaloneGrid2BoldIcon,
} from "@deriv/quill-icons/Standalone";

import {
    cleanAndConvertCamelCase,
    loadVersionData,
    toCamelCase,
    TypeData,
} from "../utils";
import BoxModelDemo from "./components/box-model-demo";
import VaultHeader from "./layout/header";

type currentTokenData = { core: string[]; semantic: string[] };

const filterKeys = (
    obj: Record<string, unknown>,
    searchString: string,
): currentTokenData => {
    const core: string[] = [];
    const semantic: string[] = [];

    Object.keys(obj).forEach((key) => {
        if (key.includes(searchString)) {
            core.push(key);
            if (key.includes("semantic")) {
                semantic.push(key);
            }
        }
    });

    return { core, semantic };
};

const Vault = () => {
    const [variables, setVariables] = useState({});
    const [categories, setCategories] = useState([]);
    const [currentVersion, setCurrentVersion] = useState("");
    const [data, setData] = useState<TypeData | null>(null);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedCategoryStyle, setSelectedCategoryStyle] = useState("");
    const [currentTokens, setCurrentTokens] = useState<currentTokenData | null>(
        null,
    );

    useEffect(() => {
        async function fetchData() {
            const loadedData = await loadVersionData(currentVersion);
            console.log({ loadedData });
            setData(loadedData);
        }
        fetchData();
    }, [currentVersion]);

    useEffect(() => {
        if (data) {
            const categoryTypeKey = Object.keys(data.variableCounts)[
                selectedCategory
            ];

            if (categoryTypeKey) {
                const chosenCategory = data.variableCounts[categoryTypeKey];
                const currentCategories = Object.keys(chosenCategory)
                    .map((categoryKey) => {
                        const tokensCount = chosenCategory[categoryKey];

                        return {
                            name: cleanAndConvertCamelCase(categoryKey),
                            value: tokensCount,
                            defaultName: categoryKey,
                        };
                    })
                    .sort((a, b) => {
                        return a.name.localeCompare(b.name);
                    }) as [];

                setCategories(currentCategories);
            }

            setVariables(data.cssVariables);
        }
    }, [selectedCategory, data]);

    useEffect(() => {
        console.log({ selectedCategoryStyle, variables });

        const styleType = toCamelCase(selectedCategoryStyle);

        setCurrentTokens(filterKeys(variables, styleType));
    }, [selectedCategoryStyle]);

    return (
        <section className="vault-section">
            <div className="vault-container">
                <VaultHeader onVersionChange={(e) => setCurrentVersion(e)} />
                <div className="vault-body">
                    <div className="vault-sidebar">
                        <Tab.Container
                            size="md"
                            contentStyle="hug"
                            selectedTabIndex={selectedCategory}
                            onTabClick={(e) => setSelectedCategory(e)}
                        >
                            <Tab.List>
                                <Tab.Trigger
                                    icon={
                                        <StandaloneGlobeRegularIcon iconSize="sm" />
                                    }
                                >
                                    Generic
                                </Tab.Trigger>
                                <Tab.Trigger
                                    icon={
                                        <StandaloneGrid2BoldIcon iconSize="sm" />
                                    }
                                >
                                    Components
                                </Tab.Trigger>
                            </Tab.List>
                        </Tab.Container>
                        <div className="menu-option">
                            {categories.length > 0 ? (
                                categories.map(({ name, value }) => (
                                    <React.Fragment key={`${name}-category`}>
                                        <DropdownItem
                                            onClick={() =>
                                                setSelectedCategoryStyle(name)
                                            }
                                            label={name}
                                            selected={
                                                selectedCategoryStyle === name
                                            }
                                            size="sm"
                                            className=""
                                            rightIcon={
                                                <Button
                                                    label={value}
                                                    color={
                                                        selectedCategoryStyle ===
                                                        name
                                                            ? "white-black"
                                                            : "black-white"
                                                    }
                                                    size="sm"
                                                />
                                            }
                                        />
                                        <Divider />
                                    </React.Fragment>
                                ))
                            ) : (
                                <Skeleton.Container direction="column">
                                    <Skeleton.Square rounded height={20} />
                                    <Skeleton.Square rounded height={20} />
                                    <Skeleton.Square rounded height={20} />
                                    <Skeleton.Square rounded height={20} />
                                    <Skeleton.Square rounded height={20} />
                                    <Skeleton.Square rounded height={20} />
                                    <Skeleton.Square rounded height={20} />
                                </Skeleton.Container>
                            )}
                        </div>
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
                                        <span className="code-item comment">
                                            /* Core {selectedCategoryStyle}{" "}
                                            Tokens */
                                        </span>
                                        {currentTokens?.core.map((token) => (
                                            <span className="code-item">
                                                {token}: {variables[token]}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Vault;
