import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { GroupPlaylistRatingDownloadModel } from "src/app/models/download-models/group-playlist-rating.model";
import { GroupPlaylistDownloadModel } from "src/app/models/download-models/group-playlist.model";
import { PlaylistRatingDownloadModel } from "src/app/models/download-models/playlist-rating.model";
import { DataService } from "src/app/services/data.service";
import { GroupSuggestionRatingService } from "src/app/services/group-suggestion-rating.service";
import { UrlHelperService } from "src/app/services/helpers/url-helper.service";
import { YesNoDialogComponent } from "../../shared/dialogs/yes-no-dialog/yes-no-dialog.component";
import { GroupPlaylistRateComponent } from "../../shared/group/dialogs/group-playlist-rate/group-playlist-rate.component";
import { GroupPlaylistRatingComponent } from "../../shared/group/group-playlist-rating/group-playlist-rating.component";
import { GroupPlaylistUserRatingListComponent } from "./group-playlist-user-rating-list/group-playlist-user-rating-list.component";

@Component({
    selector: 'app-group-playlist-details',
    templateUrl: './group-playlist-details.component.html',
    styleUrls: [
        './group-playlist-details.component.scss',
        '../../../../assets/scss/music-details.scss'
    ]
})
export class GroupPlaylistDetailsComponent implements OnInit {
    @ViewChild(GroupPlaylistUserRatingListComponent)
    private groupPlaylistUserRatingListComponent!: GroupPlaylistUserRatingListComponent;
    @ViewChild(GroupPlaylistRatingComponent)
    private groupPlaylistRatingComponent!: GroupPlaylistRatingComponent;
    
    isLoading: boolean = true;

    userHasRatedPlaylist: boolean = false;

    overallRating!: PlaylistRatingDownloadModel;

    groupPlaylist!: GroupPlaylistDownloadModel;

    groupId!: string;
    groupPlaylistId!: string;

    groupPlaylistRatingSubscription!: Subscription;

    dialogOpen: boolean = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private dialog: MatDialog,
                private urlHelperService: UrlHelperService,
                private groupSuggestionRatingService: GroupSuggestionRatingService,
                private dataService: DataService) { }

    ngOnInit(): void {
        var routeParams = this.route.snapshot.params;

        if (this.urlHelperService.isRouteParamObjectValid(routeParams) && 
            this.urlHelperService.isRouteParamValid(routeParams.groupId)) {
            this.groupId = routeParams.groupId;

            if (this.urlHelperService.isRouteParamValid(routeParams.groupPlaylistId)) {
                this.groupPlaylistId = routeParams.groupPlaylistId;

                this.getGroupPlaylistAsync(this.groupId, this.groupPlaylistId);

                this.groupPlaylistRatingSubscription = this.groupSuggestionRatingService.getRatingSubject().subscribe((data) => {
                    if (data != null) {
                        if (data.data != null && data.data instanceof GroupPlaylistRatingDownloadModel) {
                            if (data.isDelete) {
                                this.deleteRating(data.data);
                            }
                            else {
                                this.addOrUpdateRating(data.data);
                            }
                        }
                    }
                });
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

            this.overallRating = this.calculateOverallRating();

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
    
    private calculateOverallRating(): PlaylistRatingDownloadModel {
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

            return rating;
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

            return rating;
        }
    }

    private averageAndRoundToDecimal(total: number, count: number) {
        return Math.round((total / count) * 10) / 10;
    }
    
    public rateButtonClicked(): void {
        this.addOrUpdateRating(null);
    }

    public addOrUpdateRating(existingGroupPlaylistRating: GroupPlaylistRatingDownloadModel | null): void {
        if (!this.dialogOpen) {
            const dialogConfig = new MatDialogConfig();

            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '90%';
            dialogConfig.maxWidth = "800px";
            dialogConfig.height = 'fit-content';
            dialogConfig.closeOnNavigation = true;
    
            let instance = this.dialog.open(GroupPlaylistRateComponent, dialogConfig);
            this.dialogOpen = true;
    
            if (existingGroupPlaylistRating == null) {
                instance.componentInstance.groupId = this.groupId;
                instance.componentInstance.groupPlaylistId = this.groupPlaylistId;
            }
            else {
                instance.componentInstance.groupPlaylistRating = existingGroupPlaylistRating;
            }
    
            instance.afterClosed().subscribe((data) => {
                if (data != null) {
                    var groupPlaylistRating = data.data;
                
                    if (groupPlaylistRating != null && groupPlaylistRating instanceof GroupPlaylistRatingDownloadModel) {
                        if (existingGroupPlaylistRating == null) {
                            this.groupPlaylist.groupPlaylistRatings.push(groupPlaylistRating);
    
                            this.groupPlaylistUserRatingListComponent.addNewRating(groupPlaylistRating);
                            this.groupPlaylistRatingComponent.updateRating(this.calculateOverallRating());
    
                            this.userHasRatedPlaylist = true;
                        }
                        else {
                            var existingIndex = this.groupPlaylist.groupPlaylistRatings.map((gpr) => gpr.id).indexOf(groupPlaylistRating.id);
    
                            this.groupPlaylist.groupPlaylistRatings[existingIndex] = groupPlaylistRating;
                            this.groupPlaylistUserRatingListComponent.updateRating(groupPlaylistRating);
                            this.groupPlaylistRatingComponent.updateRating(this.calculateOverallRating());
                        }
                    }
                }

                this.dialogOpen = false;
            });
        }
    }

    public deleteRating(groupPlaylistRating: GroupPlaylistRatingDownloadModel): void {
        if (!this.dialogOpen) {
            const dialogConfig = new MatDialogConfig();

            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '90%';
            dialogConfig.maxWidth = "800px";
            dialogConfig.height = 'fit-content';
            dialogConfig.closeOnNavigation = true;

            let instance = this.dialog.open(YesNoDialogComponent, dialogConfig);
            instance.componentInstance.modalMessage = "Are you sure you want to delete your rating?";
            instance.componentInstance.coloursInverted = true;
            this.dialogOpen = true;

            instance.afterClosed().subscribe(async (data) => {
                if (data != null && data.isPositive != null) {
                    if (data.isPositive) {
                        await this.removeRatingAsync(groupPlaylistRating.id);

                        var existingIndex = this.groupPlaylist.groupPlaylistRatings.map((gpr) => gpr.id).indexOf(groupPlaylistRating.id);

                        this.groupPlaylist.groupPlaylistRatings.splice(existingIndex, 1);
                        this.groupPlaylistUserRatingListComponent.removeRating(groupPlaylistRating.id);

                        this.groupPlaylistRatingComponent.updateRating(this.calculateOverallRating());
                        this.userHasRatedPlaylist = false;
                    }
                }

                this.dialogOpen = false;
            });
        }
    }

    public async removeRatingAsync(groupPlaylistRatingId: string): Promise<void> {
        await this.dataService.deleteAsync(`GroupPlaylistRating/Delete?groupPlaylistRatingId=${groupPlaylistRatingId}`);
    }

}
