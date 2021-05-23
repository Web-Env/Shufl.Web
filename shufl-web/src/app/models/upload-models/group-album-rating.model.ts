import { IUploadModel } from "./upload-model.interface";

export class GroupAlbumRatingUploadModel implements IUploadModel {
    groupIdentifier!: string;
    groupAlbumIdentifier!: string;
    groupAlbumRatingId!: string;
    overallRating!: number;
    lyricsRating!: number;
    vocalsRating!: number;
    instrumentalsRating!: number;
    structureRating!: number;
    comment!: string;

    constructor(
        groupIdentifier: string,
        groupAlbumIdentifier: string,
        overallRating: number,
        lyricsRating: number,
        vocalsRating: number,
        instrumentalsRating: number,
        structureRating: number,
        comment: string
    ) {
        this.groupIdentifier = groupIdentifier;
        this.groupAlbumIdentifier = groupAlbumIdentifier;
        this.overallRating = overallRating;
        this.lyricsRating = lyricsRating;
        this.vocalsRating = vocalsRating;
        this.instrumentalsRating = instrumentalsRating;
        this.structureRating = structureRating;
        this.comment = comment;
    }
}