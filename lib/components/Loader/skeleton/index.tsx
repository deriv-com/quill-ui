import React from "react";
import Circle from "./circle";
import Square from "./square";
import Container from "./container";

export interface LoaderType {
    Circle: typeof Circle;
    Square: typeof Square;
    Container: typeof Container;
}

export const Skeleton: LoaderType = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <>{children}</>;
};

Skeleton.Circle = Circle;
Skeleton.Square = Square;
Skeleton.Container = Container;
