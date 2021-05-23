import { Component, Input, OnInit } from '@angular/core';
import { PlaylistRatingDownloadModel } from "src/app/models/download-models/playlist-rating.model";

@Component({
    selector: 'app-group-playlist-rating',
    templateUrl: './group-playlist-rating.component.html',
    styleUrls: ['../group-album-rating/group-album-rating.component.scss']
})
export class GroupPlaylistRatingComponent implements OnInit {
    @Input() rating!: PlaylistRatingDownloadModel;
    @Input() embedded: boolean = false;

    overallRating!: string;
    overallRatingsCount!: string;

    constructor() { }

    ngOnInit(): void {
        if (this.rating != null) {
            this.configureRatings(this.rating);
        }
    }

    public updateRating(rating: PlaylistRatingDownloadModel): void {
        this.configureRatings(rating);
    }

    private configureRatings(rating: PlaylistRatingDownloadModel): void {
        if (rating.overallRatingsCount != null) {
            this.overallRating = this.configureRatingCountString(rating.overallRating, rating.overallRatingsCount);
            this.overallRatingsCount = rating.overallRatingsCount.toString();
        }
        else {
            this.overallRating = this.configureRatingString(rating.overallRating);
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
