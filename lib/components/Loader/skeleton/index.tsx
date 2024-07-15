import React from "react";
import Circle from "./circle";
import Square from "./square";

interface LoaderType {
    Circle: typeof Circle;
    Square: typeof Square;
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
