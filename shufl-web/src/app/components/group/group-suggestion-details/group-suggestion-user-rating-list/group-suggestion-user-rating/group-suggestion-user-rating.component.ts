import { Component, Input, OnInit } from '@angular/core';
import { GroupSuggestionRatingDownloadModel } from "src/app/models/download-models/group-suggestion-rating.model";
import { RatingDownloadModel } from "src/app/models/download-models/rating.model";

@Component({
    selector: 'app-group-suggestion-user-rating',
    templateUrl: './group-suggestion-user-rating.component.html',
    styleUrls: ['./group-suggestion-user-rating.component.scss']
})
export class GroupSuggestionUserRatingComponent implements OnInit {
    @Input() groupSuggestionRating!: GroupSuggestionRatingDownloadModel;
    @Input() position!: string;

    rating!: RatingDownloadModel;

    constructor() { }

    ngOnInit(): void {
        if (this.groupSuggestionRating != null) {
            this.configureRating();
        }
    }

    private configureRating(): void {
        this.rating = new RatingDownloadModel(
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
