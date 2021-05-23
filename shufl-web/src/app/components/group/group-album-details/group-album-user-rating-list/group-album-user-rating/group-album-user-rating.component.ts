import { Component, Input, OnInit } from '@angular/core';
import { GroupAlbumRatingDownloadModel } from "src/app/models/download-models/group-album-rating.model";
import { RatingDownloadModel } from "src/app/models/download-models/rating.model";
import { GroupSuggestionRatingService } from "src/app/services/group-suggestion-rating.service";

@Component({
    selector: 'app-group-album-user-rating',
    templateUrl: './group-album-user-rating.component.html',
    styleUrls: ['./group-album-user-rating.component.scss']
})
export class GroupAlbumUserRatingComponent implements OnInit {
    @Input() groupAlbumRating!: GroupAlbumRatingDownloadModel;
    @Input() position!: string;

    userOwnsRating: boolean = false;

    rating!: RatingDownloadModel;

    constructor(private groupSuggestionRatingService: GroupSuggestionRatingService) { }

    ngOnInit(): void {
        if (this.groupAlbumRating != null) {
            this.configureRating();
        }
    }

    private configureRating(): void {
        this.rating = new RatingDownloadModel(
            this.groupAlbumRating.id,
            this.groupAlbumRating.overallRating,
            this.groupAlbumRating.lyricsRating,
            this.groupAlbumRating.vocalsRating,
            this.groupAlbumRating.instrumentalsRating,
            this.groupAlbumRating.structureRating,
            this.groupAlbumRating.comment,
            this.groupAlbumRating.createdBy.username,
            this.groupAlbumRating.createdBy.displayName,
            this.groupAlbumRating.createdOn
        );

        var username = localStorage.getItem('Username');
        this.userOwnsRating = this.rating.username === username;
    }

    public editButtonClicked(): void {
        this.groupSuggestionRatingService.sendAlbumRating(this.groupAlbumRating, false);
    }

    public deleteButtonClicked(): void {
        this.groupSuggestionRatingService.sendAlbumRating(this.groupAlbumRating, true);
    }

}
