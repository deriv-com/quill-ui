import { InputPhoneNumber } from "@components/Input";
import { TCountryCodes } from "@types";
import React, { useState } from "react";

const dummyList: TCountryCodes[] = [
    {
        name: "United States",
        short_code: "us",
        phone_code: "+1",
    },
    {
        name: "Canada",
        short_code: "CA",
        phone_code: "+1",
    },
    {
        name: "United Kingdom",
        short_code: "GB",
        phone_code: "+44",
    },
    {
        name: "Australia",
        short_code: "AU",
        phone_code: "+61",
    },
];

const PhoneNumber = () => {
    const [code, setCode] = useState("ca");

    const handleOnChange = (item: TCountryCodes) => {
        console.log(item);
    };
    return (
        <InputPhoneNumber
            label="Phone Number"
            codeLabel="Code"
            status="success"
            countryCodes={dummyList}
            shortCode={code}
            value="1234"
            onCodeChange={handleOnChange}
        />
    );
};

export default PhoneNumber;
