import { AnnotationModel } from './annotation-model';
import { UserModel } from './user-model';
import { VideoModel } from './video-model';
import { CommentModel } from './comment-model';

export interface PlaylistModel {
    id: string;
    video: VideoModel;
    annotations: Array<AnnotationModel>;
    user: UserModel;
    comments: Array<CommentModel>;
}
