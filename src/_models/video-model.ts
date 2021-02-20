export interface VideoModel {
    videoID: string;
    url: string;
    title: string;
    duration?: number; // calculated in annotation-editor
    tags?: Array<string>;
    maxWidth?: number; // calculated based on video width by video-player
    maxHeight?: number; // calculated based on video height by video-player
}
