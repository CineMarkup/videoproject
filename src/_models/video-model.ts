import { CommentModel } from './comment-model';

export interface VideoModel {
    videoID: string;
    blob: string | Blob;
    file: File;
    url: string;
    title: string;
    duration?: number; // calculated in annotation-editor
    tags?: Array<string>;
    maxWidth?: number; // calculated based on video width by video-player
    maxHeight?: number; // calculated based on video height by video-player
    createdBy: string;
    published: boolean;
    comments?: Array<CommentModel>;
    publishedAt?: Date;
    views?: number;
    description?: string;
}
