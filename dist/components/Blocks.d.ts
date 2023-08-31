import React from "react";
export interface BlockSchema {
    id: string;
    type: string;
    variant: string;
    data: any;
}
export interface CharleeBlocksProps {
    blockContainer?: React.ElementType;
    blockRenderer?: (block: BlockSchema, defaulRenderer: (block: BlockSchema, props: CharleeBlocksProps) => React.ReactNode) => React.ReactNode;
    paragraphRenderer?: (block: BlockSchema, props: CharleeBlocksProps) => React.ReactNode;
    headingRenderer?: (block: BlockSchema, props: CharleeBlocksProps) => React.ReactNode;
    quoteRenderer?: (block: BlockSchema, props: CharleeBlocksProps) => React.ReactNode;
    codeRenderer?: (block: BlockSchema, props: CharleeBlocksProps) => React.ReactNode;
    listRenderer?: (block: BlockSchema, props: CharleeBlocksProps) => React.ReactNode;
    referenceRenderer?: (block: BlockSchema, props: CharleeBlocksProps) => React.ReactNode;
    tableRenderer?: (block: BlockSchema, props: CharleeBlocksProps) => React.ReactNode;
    dividerRenderer?: (block: BlockSchema, props: CharleeBlocksProps) => React.ReactNode;
    assetRenderer?: (block: BlockSchema, props: CharleeBlocksProps) => React.ReactNode;
    renderMarkdown?: boolean;
    value: BlockSchema[];
}
export declare function Blocks(props: CharleeBlocksProps): Promise<(string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined)[] | null>;
//# sourceMappingURL=Blocks.d.ts.map