import React from "react";

import { marked } from "marked"

function RenderMarkdown(data : string){
    

    let value = marked.parseInline(data) as string
    
    return value
}

export interface MarkdownProps extends Omit<React.HTMLProps<any>, "as">{
    as?: React.ElementType
    renderAsText? : boolean;
    children? : string;

}
export function Markdown(props : MarkdownProps){

    const { children, as, renderAsText, ...rest} = props
    let Cmp: React.ElementType = props.as || "div";

    
    if(renderAsText){
        return <Cmp {...rest}>{children}</Cmp>
    }else{
        return <Cmp dangerouslySetInnerHTML={{ __html : RenderMarkdown(children || "")}} {...rest}></Cmp>
    }
    

}


