import React from "react";
import { InputDropdown, Text } from "../../../lib/main";

import Logo from "../assets/images/logo.svg";
import { useVersion } from "../hooks/useVersion";

export type TVersions = string[];

const VaultHeader = () => {
    const { version, versions, setVersion } = useVersion();
    return (
        <div className="vault-header">
            <div className="constrained-container">
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
                                    setVersion(e);
                                }}
                                inputSize="sm"
                                variant="fill"
                                options={versions.map((v) => ({
                                    text: v,
                                    value: v,
                                }))}
                                placeholder="Select"
                                status="neutral"
                                value={version}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VaultHeader;
