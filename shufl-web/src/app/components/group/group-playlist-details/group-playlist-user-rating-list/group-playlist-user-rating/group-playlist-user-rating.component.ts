import { Component, Input, OnInit } from '@angular/core';
import { GroupPlaylistRatingDownloadModel } from "src/app/models/download-models/group-playlist-rating.model";
import { PlaylistRatingDownloadModel } from "src/app/models/download-models/playlist-rating.model";
import { GroupSuggestionRatingService } from "src/app/services/group-suggestion-rating.service";

@Component({
    selector: 'app-group-playlist-user-rating',
    templateUrl: './group-playlist-user-rating.component.html',
    styleUrls: ['./group-playlist-user-rating.component.scss']
})
export class GroupPlaylistUserRatingComponent implements OnInit {
    @Input() groupPlaylistRating!: GroupPlaylistRatingDownloadModel;
    @Input() position!: string;

    userOwnsRating: boolean = false;

    rating!: PlaylistRatingDownloadModel;

    constructor(private groupSuggestionRatingService: GroupSuggestionRatingService) { }

    ngOnInit(): void {
        if (this.groupPlaylistRating != null) {
            this.configureRating();
        }
    }

    private configureRating(): void {
        this.rating = new PlaylistRatingDownloadModel(
            this.groupPlaylistRating.id,
            this.groupPlaylistRating.overallRating,
            this.groupPlaylistRating.comment,
            this.groupPlaylistRating.createdBy.username,
            this.groupPlaylistRating.createdBy.displayName,
            this.groupPlaylistRating.createdOn
        );

        var username = localStorage.getItem('Username');
        this.userOwnsRating = this.rating.username === username;
    }

    public editButtonClicked(): void {
        this.groupSuggestionRatingService.sendPlaylistRating(this.groupPlaylistRating, false);
    }

    public deleteButtonClicked(): void {
        this.groupSuggestionRatingService.sendPlaylistRating(this.groupPlaylistRating, true);
    }
}
