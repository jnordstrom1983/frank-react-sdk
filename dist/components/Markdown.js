import React from "react";
import { marked } from "marked";
function RenderMarkdown(data) {
    let value = marked.parseInline(data);
    return value;
}
export function Markdown(props) {
    const { children, as, renderAsText, ...rest } = props;
    let Cmp = props.as || "div";
    if (renderAsText) {
        return React.createElement(Cmp, { ...rest }, children);
    }
    else {
        return React.createElement(Cmp, { dangerouslySetInnerHTML: { __html: RenderMarkdown(children || "") }, ...rest });
    }
}
//# sourceMappingURL=Markdown.js.map