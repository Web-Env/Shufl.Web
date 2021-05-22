import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GroupPlaylistDownloadModel } from "src/app/models/download-models/group-playlist.model";
import { PlaylistRatingDownloadModel } from "src/app/models/download-models/playlist-rating.model";

@Component({
    selector: '[app-group-playlist]',
    templateUrl: './group-playlist.component.html',
    styleUrls: ['./group-playlist.component.scss']
})
export class GroupPlaylistComponent implements OnInit {
    @Input() groupPlaylist!: GroupPlaylistDownloadModel;
    
    overallRatingCalculated: boolean = false;
    overallRating!: PlaylistRatingDownloadModel;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        if (this.groupPlaylist != null) {
            this.calculateOverallRating();
        }
    }

    private calculateOverallRating(): void {
        if (this.groupPlaylist.groupPlaylistRatings != null && this.groupPlaylist.groupPlaylistRatings.length !== 0) {
            var overallRatings = this.groupPlaylist.groupPlaylistRatings.map((gpr) => gpr.overallRating);
            var overallTotal = overallRatings.reduce((sum, current) => sum + current);
            var overAllRating = this.averageAndRoundToDecimal(overallTotal, overallRatings.length);

            let rating = new PlaylistRatingDownloadModel(
                "",
                overAllRating,
                "",
                "",
                "",
                ""
            );

            rating.overallRatingsCount = overallRatings.length;

            this.overallRating = rating;
            this.overallRatingCalculated = true;
        }
        else {
            let rating = new PlaylistRatingDownloadModel(
                "",
                0,
                "",
                "",
                "",
                ""
            );

            rating.overallRatingsCount = 0;

            this.overallRating = rating;
            this.overallRatingCalculated = true;
        }
    }

    private averageAndRoundToDecimal(total: number, count: number) {
        return Math.round((total / count) * 10) / 10;
    }

    public groupPlaylistClicked(): void {
        this.router.navigate([`./p/${this.groupPlaylist.identifier}`],
            { relativeTo: this.activatedRoute });
    }

}
