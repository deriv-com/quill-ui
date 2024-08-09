import React, { useEffect, useState } from "react";
import {
    Button,
    Divider,
    DropdownItem,
    InputDropdown,
    Skeleton,
    Tab,
    Text,
} from "../../lib/main";
import "./style.scss";
import Logo from "./logo.svg";
import {
    StandaloneGlobeRegularIcon,
    StandaloneGrid2BoldIcon,
} from "@deriv/quill-icons/Standalone";

import { cleanAndConvertCamelCase, loadVersionData, TypeData } from "../utils";
import tokenVersions from "../../scripts/token-data/versions.json";

const Vault = () => {
    const [versions, setVersions] = useState<string[]>([]);
    const [variables, setVariables] = useState({});
    const [categories, setCategories] = useState([]);
    const [currentVersion, setCurrentVersion] = useState("");
    const [data, setData] = useState<TypeData | null>(null);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedCategoryStyle, setSelectedCategoryStyle] = useState("");

    useEffect(() => {
        if (tokenVersions.length) {
            setCurrentVersion(tokenVersions[0]);
            setVersions(tokenVersions);
        }
    }, [tokenVersions]);

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

    return (
        <section className="vault-section">
            <div className="vault-container">
                <div className="vault-header">
                    <div className="brand">
                        <span className="logo">
                            <img src={Logo} alt="Quill Tokens" />
                        </span>
                        <div className="version-box">
                            <Text className="app-name" size="sm" bold>
                                Quill Tokens
                            </Text>
                            {versions.length > 0 && (
                                <InputDropdown
                                    label="Version"
                                    onSelectOption={(e) => setCurrentVersion(e)}
                                    inputSize="sm"
                                    variant="fill"
                                    options={versions.map((v) => ({
                                        text: v,
                                        value: v,
                                    }))}
                                    placeholder="Select"
                                    status="neutral"
                                    value={currentVersion}
                                />
                            )}
                        </div>
                    </div>
                </div>
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
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Vault;
