// export interface VideoModel {  // TODO change to AnnotationModel
//     id?: string; // internal id
//     annotation?: string;
//     url: string;
//     duration?: number; // calculated in annotation-editor
//     start?: number;
//     end?: number;
//     isMain: boolean; // if this is the starter
//     tags?: Array<string>;
//     width?: number;
//     height?: number;
//     positionX?: number;
//     positionY?: number;
//     maxWidth?: number; // calculated based on video width by video-player
//     maxHeight?: number; // calculated based on video height by video-player
// }

export interface VideoModel {
    videoID: string;
    url: string;
    title: string;
    duration?: number; // calculated in annotation-editor
    tags?: Array<string>;
    maxWidth?: number; // calculated based on video width by video-player
    maxHeight?: number; // calculated based on video height by video-player
}
