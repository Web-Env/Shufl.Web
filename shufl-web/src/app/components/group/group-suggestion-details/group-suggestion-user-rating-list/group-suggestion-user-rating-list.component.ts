import { Component, Input, OnInit } from '@angular/core';
import { GroupSuggestionRating } from "src/app/models/download-models/group-suggestion-rating.model";
import { Rating } from "src/app/models/download-models/rating.model";

@Component({
    selector: 'app-group-suggestion-user-rating-list',
    templateUrl: './group-suggestion-user-rating-list.component.html',
    styleUrls: ['./group-suggestion-user-rating-list.component.scss']
})
export class GroupSuggestionUserRatingListComponent implements OnInit {
    ratingsLeft: GroupSuggestionRating[] = [];
    ratingsRight: GroupSuggestionRating[] = [];

    @Input() groupSuggestionRatings!: GroupSuggestionRating[];

    constructor() { }

    ngOnInit(): void {
        this.splitRatings(this.groupSuggestionRatings);
    }

    private splitRatings(ratings: GroupSuggestionRating[]): void {
        for (let i=0; i < ratings.length; i+=2) {
            this.ratingsLeft.push(ratings[i]);
            ratings[i + 1] != null && this.ratingsRight.push(ratings[i + 1]);
        }
    }

    public addNewRating(rating: GroupSuggestionRating): void {
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
