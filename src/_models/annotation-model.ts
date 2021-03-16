export interface AnnotationModel {
    annotationID?: string;
    text?: string;
    createdAt: Date;
    startTime?: number;
    stopTime?: number;
    deletedAt?: string;
    width?: number;
    height?: number;
    positionX?: number;
    positionY?: number;
    isMain: boolean; // if this is the starter
    display?: string;
    timelineWidth?: number; // width on timeline
    timelineOffset?: number; // offset used to calculate position on timeline
}
