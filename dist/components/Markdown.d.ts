import React from "react";
export interface MarkdownProps extends Omit<React.HTMLProps<any>, "as"> {
    as?: React.ElementType;
    renderAsText?: boolean;
    children?: string;
}
export declare function Markdown(props: MarkdownProps): React.JSX.Element;
//# sourceMappingURL=Markdown.d.ts.map