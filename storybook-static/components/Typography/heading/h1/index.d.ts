import { TypographyProps } from "../../base";
export type Heading = Omit<TypographyProps, "size" | "bold" | "italic" | "underlined">;
declare const H1: ({ children, className, as, ...rest }: Heading) => import("react").JSX.Element;
export default H1;
