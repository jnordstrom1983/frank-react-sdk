import { CharleeContentItem, Charleelanguage } from "../models/CharleeContentItem";
export type CharleeClientOptions = {
    baseUrl?: string;
    spaceId?: string;
    accessKey?: string;
};
export type CharleeRequestOptions = {
    contentId?: string;
    contentTypeId?: string;
    languageId?: Charleelanguage;
    expand?: string;
    expandLevels?: string;
    expandFallbackLanguageId?: string;
    query?: {
        [key: string]: any;
    };
    project?: string;
    sort?: string | {
        [key: string]: any;
    };
    sortDirection?: "asc" | "desc";
    slug?: string;
};
export declare class CharleeClient {
    baseUrl: string;
    spaceId: string;
    accessKey: string;
    constructor(options: CharleeClientOptions);
    GetItem(options: CharleeRequestOptions): Promise<CharleeContentItem | null>;
    GetItems(options: CharleeRequestOptions): Promise<CharleeContentItem[]>;
}
//# sourceMappingURL=CharleeClient.d.ts.map