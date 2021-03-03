import { UserModel } from "./user-model";

export interface CommentModel {
    text: String,
    createdBy: String,
    startTime: Number,
    createdAt: Date,
    user?: UserModel,
}