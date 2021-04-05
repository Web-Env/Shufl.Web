export class RatingDownloadModel {
    id!: string;
    overallRating!: number;
    overallRatingsCount: number | undefined;
    lyricsRating!: number | null;
    lyricsRatingsCount: number | undefined
    vocalsRating!: number | null;
    vocalsRatingsCount: number | undefined;
    instrumentalsRating!: number | null;
    instrumentalsRatingsCount: number | undefined;
    compositionRating!: number | null;
    compositionRatingsCount: number | undefined;
    comment!: string;
    username!: string;
    displayName!: string;
    createdOn!: string;

    constructor(
        id: string,
        overallRating: number,
        lyricsRating: number | null,
        vocalsRating: number | null,
        instrumentalsRating: number | null,
        compositionRating: number | null,
        comment: string,
        username: string,
        displayName: string,
        createdOn: string
    ) {
        this.id = id;
        this.overallRating = overallRating;
        this.lyricsRating = lyricsRating;
        this.vocalsRating = vocalsRating;
        this.instrumentalsRating = instrumentalsRating;
        this.compositionRating = compositionRating;
        this.comment = comment;
        this.username = username;
        this.displayName = displayName;
        this.createdOn = createdOn;
    }
}