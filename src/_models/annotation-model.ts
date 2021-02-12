export interface AnnotationModel {
    annotationId?: string;
    text?: string;
    createdAt: string;
    startTime?: number;
    stopTime?: number;
    deletedAt?: string;
    width?: number;
    height?: number;
    positionX?: number;
    positionY?: number;
    isMain: boolean; // if this is the starter
}
