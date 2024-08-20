/* eslint-disable no-inner-declarations */
import React, { createContext, useContext, useState, useEffect } from "react";
import tokenVersions from "../../../scripts/token-data/versions.json";
import { TypeData } from "../types";
import { loadVersionData } from "../../utils";
import { Categories, categorizeVariables } from "../helpers/categorizer";

export type TVersions = string[];

interface VersionContextType {
    version: string;
    versions: string[];
    setVersion: (version: string) => void;
    data: TypeData | null;
    variables: Categories;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

interface VersionProviderProps {
    children: React.ReactNode;
}

const VersionProvider: React.FC<VersionProviderProps> = ({ children }) => {
    const [versions, setVersions] = useState<TVersions>([]);
    const [currentVersion, setCurrentVersion] = useState<string>("");
    const [data, setData] = useState<TypeData | null>(null);
    const [variables, setVariables] = useState<Categories>({});

    const getInitialVersion = (versions: string[]): string => {
        const savedVersion = localStorage.getItem("version");
        const newVersion = savedVersion || versions[0];
        setCurrentVersion(newVersion);
        return newVersion;
    };

    const updateCurrentVersion = (version: string): void => {
        if (versions.includes(version)) {
            setCurrentVersion(version);
        } else {
            console.error("Invalid version provided");
        }
    };

    useEffect(() => {
        setVersions(tokenVersions);
        getInitialVersion(tokenVersions);
    }, []);

    useEffect(() => {
        if (currentVersion) {
            localStorage.setItem("version", currentVersion);
            async function fetchData() {
                const loadedData = await loadVersionData(currentVersion);
                setData(loadedData);
            }
            fetchData();
        }
    }, [currentVersion]);

    useEffect(() => {
        if (data) {
            const categorizedVars = categorizeVariables(data.cssVariables);
            setVariables(categorizedVars);
        }
    }, [data]);

    return (
        <VersionContext.Provider
            value={{
                version: currentVersion,
                versions,
                setVersion: updateCurrentVersion,
                data,
                variables,
            }}
        >
            {children}
        </VersionContext.Provider>
    );
};

export const useVersion = () => {
    const context = useContext(VersionContext);
    if (context === undefined) {
        throw new Error("useVersion must be used within a VersionProvider");
    }
    return context;
};

export default VersionProvider;
