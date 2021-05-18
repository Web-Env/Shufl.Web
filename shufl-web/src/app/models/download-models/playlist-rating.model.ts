export class PlaylistRatingDownloadModel {
    id!: string;
    overallRating!: number;
    overallRatingsCount: number | undefined;
    comment!: string;
    username!: string;
    displayName!: string;
    createdOn!: string;

    constructor(
        id: string,
        overallRating: number,
        comment: string,
        username: string,
        displayName: string,
        createdOn: string
    ) {
        this.id = id;
        this.overallRating = overallRating;
        this.comment = comment;
        this.username = username;
        this.displayName = displayName;
        this.createdOn = createdOn;
    }
}