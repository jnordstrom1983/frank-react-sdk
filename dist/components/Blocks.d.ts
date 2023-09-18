import React from "react";
export interface BlockSchema {
    id: string;
    type: string;
    variant: string;
    data: any;
}
export interface FrankBlocksProps {
    blockContainer?: React.ElementType;
    blockRenderer?: (block: BlockSchema, defaulRenderer: (block: BlockSchema, props: FrankBlocksProps) => React.ReactNode) => React.ReactNode;
    paragraphRenderer?: (block: BlockSchema, props: FrankBlocksProps) => React.ReactNode;
    headingRenderer?: (block: BlockSchema, props: FrankBlocksProps) => React.ReactNode;
    quoteRenderer?: (block: BlockSchema, props: FrankBlocksProps) => React.ReactNode;
    codeRenderer?: (block: BlockSchema, props: FrankBlocksProps) => React.ReactNode;
    listRenderer?: (block: BlockSchema, props: FrankBlocksProps) => React.ReactNode;
    referenceRenderer?: (block: BlockSchema, props: FrankBlocksProps) => React.ReactNode;
    tableRenderer?: (block: BlockSchema, props: FrankBlocksProps) => React.ReactNode;
    dividerRenderer?: (block: BlockSchema, props: FrankBlocksProps) => React.ReactNode;
    assetRenderer?: (block: BlockSchema, props: FrankBlocksProps) => React.ReactNode;
    renderMarkdown?: boolean;
    value: BlockSchema[];
}
export declare function Blocks(props: FrankBlocksProps): Promise<(string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined)[] | null>;
//# sourceMappingURL=Blocks.d.ts.map