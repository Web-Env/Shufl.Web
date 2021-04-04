import { Component, Input, OnInit } from '@angular/core';
import { RatingDownloadModel } from "src/app/models/download-models/rating.model";

@Component({
    selector: 'app-group-suggestion-rating',
    templateUrl: './group-suggestion-rating.component.html',
    styleUrls: ['./group-suggestion-rating.component.scss']
})
export class GroupSuggestionRatingComponent implements OnInit {
    @Input() rating!: RatingDownloadModel;
    @Input() embedded: boolean = false;

    overallRating!: string;
    overallRatingsCount!: string;
    
    lyricsRating!: string;
    lyricsRatingsCount!: string;
    
    vocalsRating!: string;
    vocalsRatingsCount!: string;
    
    instrumentalsRating!: string;
    instrumentalsRatingsCount!: string;
    
    compositionRating!: string;
    compositionRatingsCount!: string;

    constructor() { }

    ngOnInit(): void {
        if (this.rating != null) {
            this.configureRatings(this.rating);
        }
    }

    public updateRating(rating: RatingDownloadModel): void {
        this.configureRatings(rating);
    }

    private configureRatings(rating: RatingDownloadModel): void {
        if (rating.overallRatingsCount != null) {
            this.overallRating = this.configureRatingCountString(rating.overallRating, rating.overallRatingsCount);
            this.overallRatingsCount = rating.overallRatingsCount.toString();
        }
        else {
            this.overallRating = this.configureRatingString(rating.overallRating);
        }
        
        if (rating.lyricsRatingsCount != null) {
            this.lyricsRating = this.configureRatingCountString(rating.lyricsRating, rating.lyricsRatingsCount);
            this.lyricsRatingsCount = rating.lyricsRatingsCount.toString();
        }
        else {
            this.lyricsRating = this.configureRatingString(rating.lyricsRating);
        }
        
        if (rating.vocalsRatingsCount != null) {
            this.vocalsRating = this.configureRatingCountString(rating.vocalsRating, rating.vocalsRatingsCount);
            this.vocalsRatingsCount = rating.vocalsRatingsCount.toString();
        }
        else {
            this.vocalsRating = this.configureRatingString(rating.vocalsRating);
        }
        
        if (rating.instrumentalsRatingsCount != null) {
            this.instrumentalsRating = this.configureRatingCountString(rating.instrumentalsRating, rating.instrumentalsRatingsCount);
            this.instrumentalsRatingsCount = rating.instrumentalsRatingsCount.toString();
        }
        else {
            this.instrumentalsRating = this.configureRatingString(rating.instrumentalsRating);
        }
        
        if (rating.compositionRatingsCount != null) {
            this.compositionRating = this.configureRatingCountString(rating.compositionRating, rating.compositionRatingsCount);
            this.compositionRatingsCount = rating.compositionRatingsCount.toString();
        }
        else {
            this.compositionRating = this.configureRatingString(rating.compositionRating);
        }
    }

    private configureRatingCountString(rating: number | null, ratingCount: number): string {
        if (ratingCount === 0) {
            return ' - ';
        }
        else {
            return this.configureRatingString(rating);
        }
    }

    private configureRatingString(rating: number | null): string {
        if (rating == null) {
            return ' - ';
        }
        else {
            return rating.toString();
        }
    }

}
