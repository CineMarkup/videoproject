export interface VideoModel {
    id?: string; // internal id
    annotation?: string;
    url: string;
    duration?: number;
    start?: number;
    end?: number;
    isMain: boolean; // if this is the entire video
    tags?: Array<string>;
}

