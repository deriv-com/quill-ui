import { Snackbar } from "@components/Snackbar/snackbar";
import React, { useState } from "react";

const SnackbarTest = () => {
    const [visible, setVisible] = useState<boolean>(true);

    const Testing = () => {
        setVisible(false);
    };

    return (
        <Snackbar
            id="1"
            isVisible={visible}
            message="testing"
            onCloseAction={Testing}
            hasCloseButton={false}
            onActionClick={Testing}
            actionText="123"
        />
    );
};

export default SnackbarTest;
