import { UserDownloadModel } from "./user.model";

export class GroupAlbumRatingDownloadModel {
    id!: string;
    overallRating!: number;
    lyricsRating!: number | null;
    vocalsRating!: number | null;
    instrumentalsRating!: number | null;
    structureRating!: number | null;
    comment!: string;
    createdOn!: string;
    createdBy!: UserDownloadModel;
    lastUpdatedOn!: string;

    constructor() {}
}