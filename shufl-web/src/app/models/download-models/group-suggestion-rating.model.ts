import { User } from "./user.model";

export class GroupSuggestionRating {
    id!: string;
    overallRating!: number;
    lyricsRating!: number;
    vocalsRating!: number;
    instrumentalsRating!: number;
    compositionRating!: number;
    comment!: string;
    createdOn!: string;
    createdBy!: User;
    lastUpdatedOn!: string;

    constructor() {}
}