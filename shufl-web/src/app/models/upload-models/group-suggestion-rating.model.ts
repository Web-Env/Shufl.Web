import { IUploadModel } from "./upload-model.interface";

export class GroupSuggestionRatingUploadModel implements IUploadModel {
    groupIdentifier!: string;
    groupSuggestionIdentifier!: string;
    groupSuggestionRatingId!: string;
    overallRating!: number;
    lyricsRating!: number;
    vocalsRating!: number;
    instrumentalsRating!: number;
    compositionRating!: number;
    comment!: string;

    constructor(
        groupIdentifier: string,
        groupSuggestionIdentifier: string,
        overallRating: number,
        lyricsRating: number,
        vocalsRating: number,
        instrumentalsRating: number,
        compositionRating: number,
        comment: string
    ) {
        this.groupIdentifier = groupIdentifier;
        this.groupSuggestionIdentifier = groupSuggestionIdentifier;
        this.overallRating = overallRating;
        this.lyricsRating = lyricsRating;
        this.vocalsRating = vocalsRating;
        this.instrumentalsRating = instrumentalsRating;
        this.compositionRating = compositionRating;
        this.comment = comment;
    }
}