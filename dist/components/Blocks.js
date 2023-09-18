import React from "react";
import { Markdown } from "./Markdown";
export async function Blocks(props) {
    if (!Array.isArray(props.value)) {
        return null;
    }
    let Cmp = "div";
    if (props.blockContainer)
        Cmp = props.blockContainer;
    return props.value.map((block) => {
        const defaultRenderer = GetBlockRender(block, props);
        if (props.blockRenderer) {
            if (props.blockContainer) {
                return React.createElement(Cmp, { id: `container_${block.id}` }, props.blockRenderer(block, defaultRenderer));
            }
            return props.blockRenderer(block, defaultRenderer);
        }
        else {
            if (props.blockContainer) {
                return React.createElement(Cmp, { id: `container_${block.id}` }, defaultRenderer(block, props));
            }
            return defaultRenderer(block, props);
        }
    });
}
function GetBlockRender(block, props) {
    switch (block.type) {
        case "paragraph":
            return props.paragraphRenderer || RenderPragraph;
        case "heading":
            return props.headingRenderer || RenderHeading;
        case "quote":
            return props.quoteRenderer || RenderQuoute;
        case "code":
            return props.codeRenderer || RenderCode;
        case "list":
            return props.paragraphRenderer || RenderList;
        case "reference":
            return props.referenceRenderer || RenderReference;
        case "table":
            return props.tableRenderer || RenderTable;
        case "divider":
            return props.dividerRenderer || RenderDivider;
        case "asset":
            return props.assetRenderer || RenderAsset;
    }
    return (block) => React.createElement("div", { id: block.id, key: block.id });
}
function RenderPragraph(block, props) {
    return (React.createElement(Markdown, { as: "p", key: block.id, className: block.variant, renderAsText: !props.renderMarkdown }, block.data));
}
function RenderHeading(block, props) {
    switch (block.variant) {
        case "large":
            return (React.createElement(Markdown, { as: "h1", id: block.id, key: block.id, renderAsText: !props.renderMarkdown }, block.data));
        case "medium":
            return (React.createElement(Markdown, { as: "h2", id: block.id, key: block.id, renderAsText: !props.renderMarkdown }, block.data));
        case "small":
            return (React.createElement(Markdown, { as: "h3", id: block.id, key: block.id, renderAsText: !props.renderMarkdown }, block.data));
    }
    return (React.createElement(Markdown, { as: "h1", id: block.id, key: block.id, renderAsText: !props.renderMarkdown }, block.data));
}
function RenderQuoute(block, props) {
    return (React.createElement(Markdown, { as: "blockquote", id: block.id, key: block.id, renderAsText: !props.renderMarkdown }, block.data));
}
function RenderCode(block, props) {
    return (React.createElement(Markdown, { as: "code", id: block.id, key: block.id, renderAsText: !props.renderMarkdown }, block.data));
}
function RenderList(block, props) {
    if (block.variant === "ordered") {
        return (React.createElement("ol", { id: block.id, key: block.id }, block.data.map((li) => {
            return React.createElement(Markdown, { as: "li", renderAsText: !props.renderMarkdown, key: li.id, id: li.id }, li.text);
        })));
    }
    if (block.variant === "unordered") {
        return (React.createElement("ul", { id: block.id, key: block.id }, block.data.map((li) => {
            return React.createElement(Markdown, { as: "li", renderAsText: !props.renderMarkdown, id: li.id }, li.text);
        })));
    }
    return null;
}
function RenderReference(block, props) {
    return (React.createElement("div", { id: block.id, key: block.id }, JSON.stringify(block.data)));
}
function RenderTable(block, props) {
    return (React.createElement("table", { id: block.id, key: block.id },
        React.createElement("tbody", null, block.data.map((row, row_index) => (React.createElement("tr", { key: `row_${row_index}` }, row.map((cell, cell_index) => (React.createElement(Markdown, { as: "td", renderAsText: !props.renderMarkdown, key: `row_${row_index}_cell_${cell_index}` }, cell)))))))));
}
function RenderDivider(block, props) {
    return React.createElement("hr", { id: block.id, key: block.id });
}
function RenderAsset(block, props) {
    if (block.data.type === "image") {
        return React.createElement("img", { id: block.id, key: block.id, src: block.data.url });
    }
    return React.createElement("a", { href: block.data.url }, block.data.name);
}
//# sourceMappingURL=Blocks.js.map