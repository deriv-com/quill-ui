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
    {
        name: "Srilanka",
        short_code: "LK",
        phone_code: "+94",
    },
];

const PhoneNumber = () => {
    const [code, setCode] = useState("au");

    const handleOnChange = (item: TCountryCodes) => {
        setCode(item.short_code);
    };
    return (
        <InputPhoneNumber
            variant="fill"
            label="Phone Number"
            codeLabel="Code"
            autoComplete="off"
            countryCodes={dummyList}
            shortCode={code}
            // showFlags={false}
            onCodeChange={handleOnChange}
            onChange={(e) => {
                console.log(e.target.value);
            }}
            onValueChange={(val) => console.log(val)}
            message="message here"
            maxLength={10}
            show_counter={true}
            // disabled
        />
    );
};

export default PhoneNumber;
