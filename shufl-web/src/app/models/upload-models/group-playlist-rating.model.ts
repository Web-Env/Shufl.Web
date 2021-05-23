import { IUploadModel } from "./upload-model.interface";

export class GroupPlaylistRatingUploadModel implements IUploadModel {
    groupIdentifier!: string;
    groupPlaylistIdentifier!: string;
    groupPlaylistRatingId!: string;
    overallRating!: number;
    comment!: string;

    constructor(
        groupIdentifier: string,
        groupPlaylistIdentifier: string,
        overallRating: number,
        comment: string
    ) {
        this.groupIdentifier = groupIdentifier;
        this.groupPlaylistIdentifier = groupPlaylistIdentifier;
        this.overallRating = overallRating;
        this.comment = comment;
    }
}