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
    structureRating!: number | null;
    structureRatingsCount: number | undefined;
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
        structureRating: number | null,
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
        this.structureRating = structureRating;
        this.comment = comment;
        this.username = username;
        this.displayName = displayName;
        this.createdOn = createdOn;
    }
}