import { UserDownloadModel } from "./user.model";

export class GroupSuggestionRatingDownloadModel {
    id!: string;
    overallRating!: number;
    lyricsRating!: number | null;
    vocalsRating!: number | null;
    instrumentalsRating!: number | null;
    compositionRating!: number | null;
    comment!: string;
    createdOn!: string;
    createdBy!: UserDownloadModel;
    lastUpdatedOn!: string;

    constructor() {}
}