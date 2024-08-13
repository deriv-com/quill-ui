import React, { useEffect, useState } from "react";
import { InputDropdown, Text } from "../../../lib/main";
import tokenVersions from "../../../scripts/token-data/versions.json";
import Logo from "../assets/images/logo.svg";

export type TVersions = string[];

export interface HeaderProps {
    onVersionChange?: (e: string) => void;
}

const VaultHeader = ({ onVersionChange }: HeaderProps) => {
    const [versions, setVersions] = useState<TVersions>([]);
    const [currentVersion, setCurrentVersion] = useState("");

    useEffect(() => {
        if (tokenVersions.length) {
            const current = tokenVersions[0];
            setCurrentVersion(current);
            setVersions(tokenVersions);
            onVersionChange?.(current);
        }
    }, [tokenVersions]);
    return (
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
                            onSelectOption={(e) => {
                                onVersionChange?.(e);
                                setCurrentVersion(e);
                            }}
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
    );
};

export default VaultHeader;
