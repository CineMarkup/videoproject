import { AnnotationModel } from './annotation-model';
import { UserModel } from './user-model';
import { VideoModel } from './video-model';

export interface PlaylistModel {
    id: string;
    video: VideoModel;
    annotations: Array<AnnotationModel>;
    user: UserModel;
}
