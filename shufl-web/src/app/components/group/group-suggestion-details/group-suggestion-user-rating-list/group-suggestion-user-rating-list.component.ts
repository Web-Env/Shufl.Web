import { Component, Input, OnInit } from '@angular/core';
import { GroupSuggestionRatingDownloadModel } from "src/app/models/download-models/group-suggestion-rating.model";
import { RatingDownloadModel } from "src/app/models/download-models/rating.model";

@Component({
    selector: 'app-group-suggestion-user-rating-list',
    templateUrl: './group-suggestion-user-rating-list.component.html',
    styleUrls: ['./group-suggestion-user-rating-list.component.scss']
})
export class GroupSuggestionUserRatingListComponent implements OnInit {
    ratingsLeft: GroupSuggestionRatingDownloadModel[] = [];
    ratingsRight: GroupSuggestionRatingDownloadModel[] = [];

    @Input() groupSuggestionRatings!: GroupSuggestionRatingDownloadModel[];

    constructor() { }

    ngOnInit(): void {
        this.splitRatings(this.groupSuggestionRatings);
    }

    private splitRatings(ratings: GroupSuggestionRatingDownloadModel[]): void {
        for (let i=0; i < ratings.length; i+=2) {
            this.ratingsLeft.push(ratings[i]);
            ratings[i + 1] != null && this.ratingsRight.push(ratings[i + 1]);
        }
    }

    public addNewRating(rating: GroupSuggestionRatingDownloadModel): void {
        if (this.ratingsLeft.length < this.ratingsRight.length) {
            this.ratingsLeft.push(rating);
        }
        else if (this.ratingsRight.length < this.ratingsLeft.length) {
            this.ratingsRight.push(rating);
        }
        else {
            this.ratingsLeft.push(rating);
        }
    }
}
