import { QuillSvgProps } from "@deriv/quill-icons";

export type QuillIconComponent = React.ForwardRefExoticComponent<
    Omit<QuillSvgProps, "ref">
>;
