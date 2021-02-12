import { AnnotationModel } from './annotation-model';
import { VideoModel } from './video-model';

// export interface PlaylistModel {
//     video: Array<VideoModel>;
// }

export interface PlaylistModel {
    id: string;
    video: VideoModel;
    annotations: Array<AnnotationModel>;
}
