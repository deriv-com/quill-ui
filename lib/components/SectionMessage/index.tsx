import { ComponentProps, ReactElement, ReactNode } from "react";
import { TMediumSizes } from "@types";
import "./section-message.scss";
import clsx from "clsx";
import {
    StandaloneCircleCheckBoldIcon,
    StandaloneCircleExclamationBoldIcon,
    StandaloneCircleInfoBoldIcon,
    StandaloneTriangleExclamationBoldIcon,
} from "@deriv/quill-icons/Standalone";
import { Text } from "@components/Typography";
import Link from "@components/Link";

export interface SectionMessageProps
    extends Omit<ComponentProps<"div">, "title"> {
    title: string;
    className?: string;
    message: ReactNode;
    size: TMediumSizes;
    status?: "info" | "success" | "danger" | "warning";
    icon?: ReactNode;
    links?: ReactElement<typeof Link>[];
}

const Icons = {
    danger: (
        <StandaloneTriangleExclamationBoldIcon fill="#DB0800" iconSize="sm" />
    ),
    success: <StandaloneCircleCheckBoldIcon fill="#00822A" iconSize="sm" />,
    info: <StandaloneCircleInfoBoldIcon fill="#1789E1" iconSize="sm" />,
    warning: (
        <StandaloneCircleExclamationBoldIcon fill="#E18D00" iconSize="sm" />
    ),
};

export const SectionMessage = ({
    title,
    message,
    className,
    status,
    icon,
    size = "md",
    links,
}: SectionMessageProps) => {
    return (
        <div
            className={clsx(
                "section-message",
                `section-message--${status}`,
                className,
            )}
        >
            {status ? Icons?.[status] : icon && icon}
            <div className="section-message-content">
                <div className="title-and-message">
                    <Text bold size={size === "md" ? "lg" : "md"}>
                        {title}
                    </Text>
                    <Text size={size}>{message}</Text>
                </div>
                {links && links.length > 0 && (
                    <div className="section-message-links">
                        {links.map((link, index) => (
                            <div key={index}>{link}</div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SectionMessage;
