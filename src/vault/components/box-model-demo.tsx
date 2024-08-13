import { Text } from "@components/Typography";
import React, { useState } from "react";

const BoxModelDemo = () => {
    const [padding, setPadding] = useState(20);
    const [margin, setMargin] = useState(20);
    const [border, setBorder] = useState(5);

    return (
        <>
            {/* <div>
                <label>
                    Padding:
                    <input
                        type="number"
                        value={padding}
                        onChange={(e) => setPadding(Number(e.target.value))}
                        style={{ marginLeft: "10px", marginBottom: "10px" }}
                    />
                </label>
                <label>
                    Margin:
                    <input
                        type="number"
                        value={margin}
                        onChange={(e) => setMargin(Number(e.target.value))}
                        style={{ marginLeft: "10px", marginBottom: "10px" }}
                    />
                </label>
                <label>
                    Border:
                    <input
                        type="number"
                        value={border}
                        onChange={(e) => setBorder(Number(e.target.value))}
                        style={{ marginLeft: "10px", marginBottom: "10px" }}
                    />
                </label>
            </div> */}
            <div className="demo-box">
                <div
                    style={{
                        margin: `${margin}px`,
                        padding: `${padding}px`,
                        border: `${border}px var(--core-color-opacity-teal-500) ridge`,
                        backgroundColor: "var(--core-color-opacity-black-100)",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: -margin - border - 1,
                            left: -margin - border - 1,
                            right: -margin - border - 1,
                            bottom: -margin - border - 1,
                            border: "1px dashed red",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: -border - 1,
                            left: -border - 1,
                            right: -border - 1,
                            bottom: -border - 1,
                            border: "1px dashed green",
                        }}
                    />
                    <div className="margin-controller" />
                    <div className="padding-controller">
                        <Text size="sm">Content Area</Text>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BoxModelDemo;
