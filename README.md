# frank-react-sdk
This is a SDK to consume frank-data from your React/NextJS app.

## Configuration
The connection details can be configured in two ways, by environment variables or when initialising the client.

#### Environment variables
Set the following environment variables to configure your connection details.
| Variable  | Description  |
|--|--|
|FRANK_BASEURL  | URL to your Frank installation |
|FRANK_SPACEID  | ID of space to load information from |
|FRANK_ACCESSKEY  | Content Access Key to use when using the client |


#### When initialising the client
```
const client = new FrankClient({
    baseUrl : "https://demo.frank",
    spaceId : "s00000000",
    accessKey :  "..."
});
```



## Querying items
```
const items = await client.GetItems(options)
```

#### Options
When querying data all parameters that can be used in the `Frank Content API`can be used. 
| Option  | Description  |
|--|--|
|contentId  | Comma separated list of contentIds |
|contentTypeId  | Comma separated list of content types |
|folderId  | Comma separated list of folderIds |
|languageId  | Comma separated list of languages to include |
|expand  | Set to 'true' if referenced content should be expanded |
|expandLevels  | Content Access Key to use when using the client |
|expandFallbackLanguageId  | How many levels to expand when expanding referenced content. Default to 1. |
|query  | Query Content with a MongoDB style query. |
|project  | Comma separated list of fields to return from the data property. |
|slug  | Comma separated list of slugs to query |
|sort  | Comma separated list of fields to sort by, or sort object |
|sortDirection  | asc or desc |


## Querying item
```
const item = await client.GetItem(options)
```

#### Options
Same option as above



## Render content
Content from Frank can be rendered in your app just as any data. However, frank-react-sdk comes with a few helper components that can render data for you.


### Markdown
With the `<Markdown/>` component you can easily render markdown markup. Simply pass your markdown code as children to the component.
```
import { Markdown } from  "frank-react-sdk"

function render(){
   return <Markdown>hello *world*</MarkDown>
} 
```

You can also specity what node type that the markdown should be rendered as by specifying the `as` attribute:
```
 <Markdown as="h1">hello *world*</MarkDown>
```


### Blocks data type
If you have data stored in the Blocks data type from Frank you can use the `<Blocks/>` object to convert the Blocks data into HTML and/or JSX.

To render the content of a Blocks field simply use: 
```
import { Blocks } from  "frank-react-sdk"

function render(){
   return <Blocks value={item.data.field}/>
} 
```


The Blocks component have various options that can be passed as props to the component
| Property  | Description |
|--|--|
| value | Array of blocks to render |
| renderMarkdown | Set to true if text content should be handled as markdown |
| blockContainer | What element type should be used as the container for all blocks, defaults to `div` |
| blockRenderer | A function that will be used to render each block, should return ReactNode|
| paragraphRenderer | A function that will be used to paragraph blocks, should return ReactNode|
| headingRenderer | A function that will be used to heading blocks, should return ReactNode|
| codeRenderer | A function that will be used to code blocks, should return ReactNode|
| referenceRenderer | A function that will be used to referece blocks, should return ReactNode|
| tableRenderer | A function that will be used to table blocks, should return ReactNode|
| dividerRenderer | A function that will be used to divder blocks, should return ReactNode|
| assetRenderer | A function that will be used to asset blocks, should return ReactNode|
