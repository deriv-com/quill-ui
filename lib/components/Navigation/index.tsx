import React, { ReactNode } from "react";
import { BottomAction, BottomBar } from "./bottom-navigation";

interface NavigationType {
    Bottom: typeof BottomBar;
    BottomAction: typeof BottomAction;
}

export const Navigation: NavigationType = ({
    children,
}: {
    children: ReactNode;
}) => {
    return <>{children}</>;
};

Navigation.Bottom = BottomBar;
Navigation.BottomAction = BottomAction;

export default Navigation;
