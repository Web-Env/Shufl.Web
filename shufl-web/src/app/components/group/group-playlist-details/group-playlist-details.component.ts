import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { GroupPlaylistRatingDownloadModel } from "src/app/models/download-models/group-playlist-rating.model";
import { GroupPlaylistDownloadModel } from "src/app/models/download-models/group-playlist.model";
import { PlaylistRatingDownloadModel } from "src/app/models/download-models/playlist-rating.model";
import { DataService } from "src/app/services/data.service";
import { UrlHelperService } from "src/app/services/helpers/url-helper.service";

@Component({
    selector: 'app-group-playlist-details',
    templateUrl: './group-playlist-details.component.html',
    styleUrls: [
        './group-playlist-details.component.scss',
        '../../../../assets/scss/music-details.scss'
    ]
})
export class GroupPlaylistDetailsComponent implements OnInit {
    isLoading: boolean = true;

    userHasRatedPlaylist: boolean = false;

    overallRating!: PlaylistRatingDownloadModel;

    groupPlaylist!: GroupPlaylistDownloadModel;

    groupId!: string;
    groupPlaylistId!: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private dialog: MatDialog,
                private urlHelperService: UrlHelperService,
                private dataService: DataService) { }

    ngOnInit(): void {
        var routeParams = this.route.snapshot.params;

        if (this.urlHelperService.isRouteParamObjectValid(routeParams) && 
            this.urlHelperService.isRouteParamValid(routeParams.groupId)) {
            this.groupId = routeParams.groupId;

            if (this.urlHelperService.isRouteParamValid(routeParams.groupPlaylistId)) {
                this.groupPlaylistId = routeParams.groupPlaylistId;

                this.getGroupPlaylistAsync(this.groupId, this.groupPlaylistId);
                // this.groupSuggestionRatingSubscription = this.groupSuggestionRatingService.getRatingSubject().subscribe((data) => {
                //     if (data != null) {
                //         if (data.data != null && data.data instanceof GroupSuggestionRatingDownloadModel) {
                //             if (data.isDelete) {
                //                 this.deleteRating(data.data);
                //             }
                //             else {
                //                 this.addOrUpdateRating(data.data);
                //             }
                //         }
                //     }
                // });
            }
            else {
                this.router.navigate([`/group/${this.groupId}`]);
            }
        }
        else {
            this.router.navigate(['']);
        }
    }

    private async getGroupPlaylistAsync(groupIdentifier: string, groupPlaylistIdentifier: string): Promise<void> {
        try {
            this.groupPlaylist = await this.dataService.getAsync<GroupPlaylistDownloadModel>(
                `GroupPlaylist/Get?groupIdentifier=${groupIdentifier}&groupPlaylistIdentifier=${groupPlaylistIdentifier}`, GroupPlaylistDownloadModel);

            this.groupPlaylist.groupPlaylistRatings = this.dataService.mapJsonArrayToObjectArray<GroupPlaylistRatingDownloadModel>(
                this.groupPlaylist.groupPlaylistRatings, GroupPlaylistRatingDownloadModel
            );

            this.calculateOverallRating();

            var username = localStorage.getItem('Username');
            this.userHasRatedPlaylist = this.groupPlaylist.groupPlaylistRatings.find((gpr) => gpr.createdBy.username === username) != null;
        }
        catch (err) {
            throw err;
        }
        finally {
            this.isLoading = false;
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
        }
    }

    private averageAndRoundToDecimal(total: number, count: number) {
        return Math.round((total / count) * 10) / 10;
    }
    
    public rateButtonClicked(): void {
    }

}
