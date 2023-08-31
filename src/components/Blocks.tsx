import React from "react"
import { Markdown } from "./Markdown";
export interface BlockSchema {
  id: string;
  type: string;
  variant: string;
  data: any;
}

export interface CharleeBlocksProps {
  blockContainer?: React.ElementType;
  blockRenderer?: (block: BlockSchema, defaulRenderer: (block: BlockSchema, props : CharleeBlocksProps) => React.ReactNode) => React.ReactNode;
  paragraphRenderer?: (block: BlockSchema, props : CharleeBlocksProps) => React.ReactNode;
  headingRenderer?: (block: BlockSchema, props : CharleeBlocksProps) => React.ReactNode;
  quoteRenderer?: (block: BlockSchema, props : CharleeBlocksProps) => React.ReactNode;
  codeRenderer?: (block: BlockSchema, props : CharleeBlocksProps) => React.ReactNode;
  listRenderer?: (block: BlockSchema, props : CharleeBlocksProps) => React.ReactNode;
  referenceRenderer?: (block: BlockSchema, props : CharleeBlocksProps) => React.ReactNode;
  tableRenderer?: (block: BlockSchema, props : CharleeBlocksProps) => React.ReactNode;
  dividerRenderer?: (block: BlockSchema, props : CharleeBlocksProps) => React.ReactNode;
  assetRenderer?: (block: BlockSchema, props : CharleeBlocksProps) => React.ReactNode;
  renderMarkdown? : boolean
  value : BlockSchema[]
}

export async function Blocks(props: CharleeBlocksProps) {
  
  if (!Array.isArray(props.value)) {
    return null;
  }

  let Cmp: React.ElementType = "div";
  if (props.blockContainer) Cmp = props.blockContainer;


  return props.value.map((block) => {
    const defaultRenderer = GetBlockRender(block, props);

    if (props.blockRenderer) {
      if(props.blockContainer){
        return <Cmp id={`container_${block.id}`}>{props.blockRenderer(block, defaultRenderer)}</Cmp>
      }
      return props.blockRenderer(block, defaultRenderer);
    } else {
      if(props.blockContainer){
        return <Cmp id={`container_${block.id}`}>{defaultRenderer(block, props)}</Cmp>
      }      
      return defaultRenderer(block, props);
    }
  });
}

function GetBlockRender(block: BlockSchema, props: CharleeBlocksProps): (block: BlockSchema, props : CharleeBlocksProps) => React.ReactNode {
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
  return (block: BlockSchema) => <div id={block.id} key={block.id}></div>;
}


function RenderPragraph(block: BlockSchema, props : CharleeBlocksProps): React.ReactNode {
  return (
    <Markdown as="p" key={block.id} className={block.variant} renderAsText={!props.renderMarkdown}>{block.data}</Markdown>
  );
}

function RenderHeading(block: BlockSchema, props : CharleeBlocksProps): React.ReactNode {
  switch (block.variant) {
    case "large":
      return (
        <Markdown as="h1" id={block.id} key={block.id} renderAsText={!props.renderMarkdown}>
          {block.data}
        </Markdown>
      );
    case "medium":
      return (
        <Markdown as="h2" id={block.id} key={block.id} renderAsText={!props.renderMarkdown}>
          {block.data}
        </Markdown>
      );
    case "small":
      return (
        <Markdown as="h3" id={block.id} key={block.id} renderAsText={!props.renderMarkdown}>
          {block.data}
        </Markdown>
      );
  }
  return (
    <Markdown as="h1"  id={block.id} key={block.id} renderAsText={!props.renderMarkdown}>
      {block.data}
    </Markdown>
  );
}

function RenderQuoute(block: BlockSchema, props : CharleeBlocksProps): React.ReactNode {
  return (
    <Markdown as="blockquote" id={block.id} key={block.id} renderAsText={!props.renderMarkdown}>
      {block.data}
    </Markdown>
  );
}

function RenderCode(block: BlockSchema, props : CharleeBlocksProps): React.ReactNode {
  return (
    <Markdown as="code" id={block.id} key={block.id} renderAsText={!props.renderMarkdown}>
      {block.data}
    </Markdown>
  );
}

function RenderList(block: BlockSchema, props : CharleeBlocksProps): React.ReactNode {
  if (block.variant === "ordered") {
    return (
      <ol id={block.id} key={block.id}>
        {block.data.map((li: any) => {
          return <Markdown as="li" renderAsText={!props.renderMarkdown} key={li.id} id={li.id}>{li.text}</Markdown>;
        })}
      </ol>
    );
  }
  if (block.variant === "unordered") {
    return (
      <ul id={block.id} key={block.id}>
        {block.data.map((li: any) => {
          return <Markdown as="li" renderAsText={!props.renderMarkdown} id={li.id}>{li.text}</Markdown>;
        })}
      </ul>
    );
  }
  return null;
}

function RenderReference(block: BlockSchema, props : CharleeBlocksProps): React.ReactNode {
  return (
    <div id={block.id} key={block.id}>
      {JSON.stringify(block.data)}
    </div>
  );
}

function RenderTable(block: BlockSchema, props : CharleeBlocksProps): React.ReactNode {
  return (
    <table id={block.id} key={block.id}>
      <tbody>
      {block.data.map((row : any, row_index : number) => (
        <tr key={`row_${row_index}`}>
          {row.map((cell: string, cell_index : number) => (
            <Markdown as="td" renderAsText={!props.renderMarkdown}  key={`row_${row_index}_cell_${cell_index}`}>{cell}</Markdown>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
}

function RenderDivider(block: BlockSchema, props : CharleeBlocksProps): React.ReactNode {
  return <hr id={block.id} key={block.id}/>;
}
function RenderAsset(block: BlockSchema, props : CharleeBlocksProps): React.ReactNode {
  if(block.data.type === "image"){
    return <img id={block.id} key={block.id} src={block.data.url}/>;
  }


  return <a href={block.data.url}>{block.data.name}</a>;
}

