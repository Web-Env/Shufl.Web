import { Component, Input, OnInit } from '@angular/core';
import { GroupSuggestionRating } from "src/app/models/download-models/group-suggestion-rating.model";
import { Rating } from "src/app/models/download-models/rating.model";

@Component({
    selector: 'app-group-suggestion-user-rating',
    templateUrl: './group-suggestion-user-rating.component.html',
    styleUrls: ['./group-suggestion-user-rating.component.scss']
})
export class GroupSuggestionUserRatingComponent implements OnInit {
    @Input() groupSuggestionRating!: GroupSuggestionRating;
    @Input() position!: string;

    rating!: Rating;

    constructor() { }

    ngOnInit(): void {
        if (this.groupSuggestionRating != null) {
            this.configureRating();
        }
    }

    private configureRating(): void {
        this.rating = new Rating(
            this.groupSuggestionRating.id,
            this.groupSuggestionRating.overallRating,
            this.groupSuggestionRating.lyricsRating,
            this.groupSuggestionRating.vocalsRating,
            this.groupSuggestionRating.instrumentalsRating,
            this.groupSuggestionRating.compositionRating,
            this.groupSuggestionRating.comment,
            this.groupSuggestionRating.createdBy.username,
            this.groupSuggestionRating.createdBy.displayName
        );
    }

}
