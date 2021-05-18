import { UserDownloadModel } from "./user.model";

export class GroupPlaylistRatingDownloadModel {
    id!: string;
    overallRating!: number;
    comment!: string;
    createdOn!: string;
    createdBy!: UserDownloadModel;
    lastUpdatedOn!: string;

    constructor() {}
}