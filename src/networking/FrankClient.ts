import { FrankContentItem, Franklanguage } from "../models/FrankContentItem";

export type FrankClientOptions = {
  baseUrl?: string;
  spaceId?: string;
  accessKey?: string;
};

export type FrankRequestOptions = {
  contentId?: string;
  contentTypeId?: string;
  folderId? : string;
  languageId?: Franklanguage[];
  expand?: "true" | "false";
  expandLevels?: string;
  expandFallbackLanguageId?: Franklanguage;
  query?: { [key: string]: any };
  project?: string;
  sort?: string | { [key: string]: any };
  sortDirection?: "asc" | "desc";
  slug?: string;
};

export class FrankClient {
  baseUrl: string;
  spaceId: string;
  accessKey : string;


  constructor(options: FrankClientOptions) {
    this.baseUrl = options.baseUrl || process.env.FRANK_BASEURL || "";
    this.spaceId = options.spaceId || process.env.FRANK_SPACEID || "";
    this.accessKey = options.accessKey || process.env.FRANK_ACCESSKEY || "";
  }

  async GetItem(options: FrankRequestOptions): Promise<FrankContentItem | null> {
    const items = await this.GetItems(options);
    if (items.length > 0) {
      return items[0];
    }
    return null;
  }

  async GetItems(options: FrankRequestOptions): Promise<FrankContentItem[]> {
    let params: { key: string; value: string }[] = [];
    if (options.contentId) params = [...params, { key: "contentId", value: options.contentId }];
    if (options.contentTypeId) params = [...params, { key: "contentTypeId", value: options.contentTypeId }];
    if (options.slug) params = [...params, { key: "slug", value: options.slug }];
    if (options.folderId) params = [...params, { key: "contentId", value: options.folderId }];
    if (options.languageId) params = [...params, { key: "languageId", value: options.languageId.join(",") }];
    if (options.expand) params = [...params, { key: "expand", value: options.expand }];
    if (options.expandLevels) params = [...params, { key: "expandLevels", value: options.expandLevels }];
    if (options.expandFallbackLanguageId) params = [...params, { key: "expandFallbackLanguageId", value: options.expandFallbackLanguageId }];
    if (options.project) params = [...params, { key: "project", value: options.project }];
    if (options.query) params = [...params, { key: "query", value: JSON.stringify(options.query) }];
    if (options.sort) {
      if (typeof options.sort === "string") {
        params = [...params, { key: "sort", value: options.sort }];
      } else {
        params = [...params, { key: "sort", value: JSON.stringify(options.sort) }];
      }
    }
    if (options.sortDirection) params = [...params, { key: "sortDirection", value: options.sortDirection }];

    const url = `${this.baseUrl}/content/${this.spaceId}?` + params.map((p) => `${p.key}=${encodeURIComponent(p.value)}`).join("&");
    
    const headers = new Headers({});
    if(this.accessKey){
      headers.append("Authorization", `Bearer ${this.accessKey}`);
    }
    
    //@ts-ignore
    const result = await fetch(url, { headers,  next: { revalidate: 3600, tags: ["frank"] } });
    if (result.ok) {
      const data = (await result.json()) as { items: FrankContentItem[] };
      return data.items;
    } else {
      return [];
    }
  }
}
