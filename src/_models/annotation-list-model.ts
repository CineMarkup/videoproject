import { AnnotationModel } from './annotation-model';

export interface AnnotationListModel {
    id?: string;
    videoID: string;
    annotationList: Array<string>;
}
