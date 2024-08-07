import { BreadcrumbProps, LinkProps } from "../types";
import { Fragment, useEffect, useState } from "react";
import { maxLinks } from "./constants";
import "./breadcrumbs.scss";
import useBreakpoints from "@hooks/useBreakpoints";
import clsx from "clsx";
import Link from "@components/Link";

export function Base({ size = "sm", links = [], className }: BreadcrumbProps) {
    const [renderLinks, setRenderLinks] = useState<LinkProps[]>([]);
    const [dropdownLinks, setDropdownLinks] = useState<LinkProps[]>([]);

    const isLastItem = (key: number) => renderLinks.length - 1 > key;
    const linksLen = links.length;
    const { isMobile } = useBreakpoints();
    const hasExtra = isMobile && maxLinks < linksLen;

    useEffect(() => {
        setRenderLinks(links);

        if (hasExtra) {
            const limitedLinks = [
                links[0],
                { content: "...", href: "" },
                links[linksLen - 2],
                links[linksLen - 1],
            ];

            setRenderLinks(limitedLinks);

            const remainingLinks: LinkProps[] = links.filter(
                (item) => !new Set(limitedLinks).has(item),
            );

            setDropdownLinks(remainingLinks);
        }
    }, [links]);

    return (
        <div className={clsx("breadcrumb--container", className)}>
            {renderLinks.map(({ content, href }, lk) => (
                <Fragment key={`breadcrumbs-${content}`}>
                    {hasExtra && lk === 1 && (
                        <select
                            className="breadcrumb--dropdown"
                            onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>,
                            ) => {
                                if (typeof window !== "undefined") {
                                    const url = e.target.value;

                                    try {
                                        const sanitizedUrl = new URL(url);
                                        window.location.href =
                                            sanitizedUrl.href;
                                    } catch (err) {
                                        console.error("Invalid URL:", url);
                                    }
                                }
                            }}
                        >
                            {dropdownLinks.map(({ href, content }) => {
                                return (
                                    <option
                                        key={`dropdown-${content}`}
                                        value={href}
                                    >
                                        {content}
                                    </option>
                                );
                            })}
                        </select>
                    )}

                    <Link
                        size={size}
                        href={href}
                        hasHoverEffect={false}
                        hasChevron={isLastItem(lk)}
                        color="black"
                        disabled={!isLastItem(lk)}
                        className="breadcrumb--item"
                    >
                        {content}
                    </Link>
                </Fragment>
            ))}
        </div>
    );
}

export default Base;
