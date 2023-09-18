import { FrankContentItem, Franklanguage } from "../models/FrankContentItem";
export declare type FrankClientOptions = {
    baseUrl?: string;
    spaceId?: string;
    accessKey?: string;
};
export declare type FrankRequestOptions = {
    contentId?: string;
    contentTypeId?: string;
    folderId?: string;
    languageId?: Franklanguage[];
    expand?: "true" | "false";
    expandLevels?: string;
    expandFallbackLanguageId?: Franklanguage;
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
export declare class FrankClient {
    baseUrl: string;
    spaceId: string;
    accessKey: string;
    constructor(options: FrankClientOptions);
    GetItem<T = Record<string, any>>(options: FrankRequestOptions): Promise<FrankContentItem<T> | null>;
    GetItems<T = Record<string, any>>(options: FrankRequestOptions): Promise<FrankContentItem<T>[]>;
}
//# sourceMappingURL=FrankClient.d.ts.map