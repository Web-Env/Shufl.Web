import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";

import { AlbumDownloadModel } from "src/app/models/download-models/album.model";
import { GroupSuggestionRatingDownloadModel } from "src/app/models/download-models/group-suggestion-rating.model";
import { RatingDownloadModel } from "src/app/models/download-models/rating.model";
import { GroupSuggestionDownloadModel } from "src/app/models/download-models/group-suggestion.model";
import { DataService } from "src/app/services/data.service";
import { UrlHelperService } from "src/app/services/helpers/url-helper.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { GroupSuggestionRateComponent } from "../../shared/group/dialogs/group-suggestion-rate/group-suggestion-rate.component";
import { GroupSuggestionUserRatingListComponent } from "./group-suggestion-user-rating-list/group-suggestion-user-rating-list.component";
import { GroupSuggestionRatingComponent } from "../../shared/group/group-suggestion-rating/group-suggestion-rating.component";
import { GroupSuggestionRatingService } from "src/app/services/group-suggestion-rating.service";
import { YesNoDialogComponent } from "../../shared/dialogs/yes-no-dialog/yes-no-dialog.component";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-group-suggestion-details',
    templateUrl: './group-suggestion-details.component.html',
    styleUrls: [
        './group-suggestion-details.component.scss',
        '../../../../assets/scss/music-details.scss'
    ]
})
export class GroupSuggestionDetailsComponent implements OnInit, OnDestroy {
    @ViewChild(GroupSuggestionUserRatingListComponent)
    private groupSuggestionUserRatingListComponent!: GroupSuggestionUserRatingListComponent;
    @ViewChild(GroupSuggestionRatingComponent)
    private groupSuggestionRatingComponent!: GroupSuggestionRatingComponent;

    isLoading: boolean = true;

    album!: AlbumDownloadModel;

    spotifyUsername!: string | null;
    
    overallRating!: RatingDownloadModel;

    genres!: string[];

    groupSuggestion!: GroupSuggestionDownloadModel;

    groupId!: string;
    groupSuggestionId!: string;

    userHasRatedSuggestion: boolean = false;

    groupSuggestionRatingSubscription!: Subscription;

    dialogOpen: boolean = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private dialog: MatDialog,
                private toastr: ToastrService,
                private dataService: DataService,
                private urlHelperService: UrlHelperService,
                private groupSuggestionRatingService: GroupSuggestionRatingService) { }

    ngOnInit(): void {
        this.spotifyUsername = localStorage.getItem('SpotifyUsername');

        var routeParams = this.route.snapshot.params;

        if (this.urlHelperService.isRouteParamObjectValid(routeParams) && 
            this.urlHelperService.isRouteParamValid(routeParams.groupId)) {
            this.groupId = routeParams.groupId;

            if (this.urlHelperService.isRouteParamValid(routeParams.groupSuggestionId)) {
                this.groupSuggestionId = routeParams.groupSuggestionId;

                this.getGroupSuggestionAsync(this.groupId, this.groupSuggestionId);
                this.groupSuggestionRatingSubscription = this.groupSuggestionRatingService.getRatingSubject().subscribe((data) => {
                    if (data != null) {
                        if (data.data != null && data.data instanceof GroupSuggestionRatingDownloadModel) {
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

    private async getGroupSuggestionAsync(groupIdentifier: string, groupSuggestionIdentifier: string): Promise<void> {
        try {
            this.groupSuggestion = await this.dataService.getAsync<GroupSuggestionDownloadModel>(
                `GroupSuggestion/Get?groupIdentifier=${groupIdentifier}&groupSuggestionIdentifier=${groupSuggestionIdentifier}`, GroupSuggestionDownloadModel);

            this.groupSuggestion.groupSuggestionRatings = this.dataService.mapJsonArrayToObjectArray<GroupSuggestionRatingDownloadModel>(
                this.groupSuggestion.groupSuggestionRatings, GroupSuggestionRatingDownloadModel
            );

            this.album = this.groupSuggestion.album;
            this.overallRating = this.calculateOverallRating();

            var username = localStorage.getItem('Username');
            this.userHasRatedSuggestion = this.groupSuggestion.groupSuggestionRatings.find((gsr) => gsr.createdBy.username === username) != null;
        }
        catch (err) {
            throw err;
        }
        finally {
            this.isLoading = false;
        }
    }
    
    private calculateOverallRating(): RatingDownloadModel {
        if (this.groupSuggestion.groupSuggestionRatings != null && this.groupSuggestion.groupSuggestionRatings.length !== 0) {
            var overallRatings = this.groupSuggestion.groupSuggestionRatings.map((gsr) => gsr.overallRating);
            var overallTotal = overallRatings.reduce((sum, current) => sum + current);
            var overAllRating = this.averageAndRoundToDecimal(overallTotal, overallRatings.length);

            var lyricsRatings = this.groupSuggestion.groupSuggestionRatings.filter((gsr) => gsr.lyricsRating != null)?.map((gsr) => gsr.lyricsRating as number);
            var lyricsTotal = lyricsRatings.length > 0 ? lyricsRatings.reduce((sum, current) => sum + current) : null;
            var lyricsRating = lyricsTotal != null ? this.averageAndRoundToDecimal(lyricsTotal, lyricsRatings.length) : null;

            var vocalsRatings = this.groupSuggestion.groupSuggestionRatings.filter((gsr) => gsr.vocalsRating != null)?.map((gsr) => gsr.vocalsRating as number);
            var vocalsTotal = vocalsRatings.length > 0 ? vocalsRatings.reduce((sum, current) => sum + current) : null;
            var vocalsRating = vocalsTotal != null ? this.averageAndRoundToDecimal(vocalsTotal, vocalsRatings.length) : null;

            var instrumentalsRatings = this.groupSuggestion.groupSuggestionRatings.filter((gsr) => gsr.instrumentalsRating != null)?.map((gsr) => gsr.instrumentalsRating as number);
            var instrumentalsTotal = instrumentalsRatings.length > 0 ? instrumentalsRatings.reduce((sum, current) => sum + current) : null;
            var instrumentalsRating = instrumentalsTotal != null ? this.averageAndRoundToDecimal(instrumentalsTotal, instrumentalsRatings?.length) : null;

            var structureRatings = this.groupSuggestion.groupSuggestionRatings.filter((gsr) => gsr.structureRating != null)?.map((gsr) => gsr.structureRating as number);
            var structureTotal = structureRatings.length > 0 ? structureRatings.reduce((sum, current) => sum + current) : null;
            var structureRating = structureTotal != null ? this.averageAndRoundToDecimal(structureTotal, structureRatings?.length) : null;

            let rating = new RatingDownloadModel(
                "",
                overAllRating,
                lyricsRating,
                vocalsRating,
                instrumentalsRating,
                structureRating,
                "",
                "",
                "",
                ""
            );

            rating.overallRatingsCount = overallRatings.length;
            rating.lyricsRatingsCount = lyricsRatings.length;
            rating.vocalsRatingsCount = vocalsRatings.length;
            rating.instrumentalsRatingsCount = instrumentalsRatings.length;
            rating.structureRatingsCount = structureRatings.length;

            return rating;
        }
        else {
            let rating = new RatingDownloadModel(
                "",
                0,
                0,
                0,
                0,
                0,
                "",
                "",
                "",
                ""
            );

            rating.overallRatingsCount = 0;
            rating.lyricsRatingsCount = 0;
            rating.vocalsRatingsCount = 0;
            rating.instrumentalsRatingsCount = 0;
            rating.structureRatingsCount = 0;

            return rating;
        }
    }

    private averageAndRoundToDecimal(total: number, count: number) {
        return Math.round((total / count) * 10) / 10;
    }

    public rateButtonClicked(): void {
        this.addOrUpdateRating(null);
    }

    public addOrUpdateRating(existingGroupSuggestionRating: GroupSuggestionRatingDownloadModel | null): void {
        if (!this.dialogOpen) {
            const dialogConfig = new MatDialogConfig();

            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '90%';
            dialogConfig.maxWidth = "800px";
            dialogConfig.height = 'fit-content';
            dialogConfig.closeOnNavigation = true;
    
            let instance = this.dialog.open(GroupSuggestionRateComponent, dialogConfig);
            this.dialogOpen = true;
    
            if (existingGroupSuggestionRating == null) {
                instance.componentInstance.groupId = this.groupId;
                instance.componentInstance.groupSuggestionId = this.groupSuggestionId;
            }
            else {
                instance.componentInstance.groupSuggestionRating = existingGroupSuggestionRating;
            }
    
            instance.afterClosed().subscribe((data) => {
                if (data != null) {
                    var groupSuggestionRating = data.data;
                
                    if (groupSuggestionRating != null && groupSuggestionRating instanceof GroupSuggestionRatingDownloadModel) {
                        if (existingGroupSuggestionRating == null) {
                            this.groupSuggestion.groupSuggestionRatings.push(groupSuggestionRating);
    
                            this.groupSuggestionUserRatingListComponent.addNewRating(groupSuggestionRating);
                            this.groupSuggestionRatingComponent.updateRating(this.calculateOverallRating());
    
                            this.userHasRatedSuggestion = true;
                        }
                        else {
                            var existingIndex = this.groupSuggestion.groupSuggestionRatings.map((gsr) => gsr.id).indexOf(groupSuggestionRating.id);
    
                            this.groupSuggestion.groupSuggestionRatings[existingIndex] = groupSuggestionRating;
                            this.groupSuggestionUserRatingListComponent.updateRating(groupSuggestionRating);
    
                            this.groupSuggestionRatingComponent.updateRating(this.calculateOverallRating());
                        }
                    }
                }

                this.dialogOpen = false;
            });
        }
    }

    public deleteRating(groupSuggestionRating: GroupSuggestionRatingDownloadModel): void {
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
                        await this.removeRatingAsync(groupSuggestionRating.id);

                        var existingIndex = this.groupSuggestion.groupSuggestionRatings.map((gsr) => gsr.id).indexOf(groupSuggestionRating.id);

                        this.groupSuggestion.groupSuggestionRatings.splice(existingIndex, 1);
                        this.groupSuggestionUserRatingListComponent.removeRating(groupSuggestionRating.id);

                        this.groupSuggestionRatingComponent.updateRating(this.calculateOverallRating());
                        this.userHasRatedSuggestion = false;
                    }
                }

                this.dialogOpen = false;
            });
        }
    }

    public async removeRatingAsync(groupSuggestionRatingId: string): Promise<void> {
        await this.dataService.deleteAsync(`GroupSuggestionRating/Delete?groupSuggestionRatingId=${groupSuggestionRatingId}`);
    }
    
    public async queueAlbumAsync(): Promise<void> {
        try {
            this.toastr.info(`Queueing ${this.album.name}...`, 'Queueing Album');

            await this.dataService.postWithoutBodyOrResponseAsync(`Spotify/QueueAlbum?albumId=${this.album.id}`, true);

            this.toastr.clear();
            this.toastr.success(`${this.album.name} has been added to your queue`, 'Added to Queue');
        }
        catch (err) {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 400) {
                    if (err.error.errorType != null && err.error.errorType === 'SpotifyNoActiveDevicesException') {
                        this.toastr.clear();
                        this.toastr.warning('There are no active devices to add this album to the queue', 'Error Queueing Album');
                    }
                    else {
                        this.dataService.handleError(err);
                    }
                }
                else {
                    this.dataService.handleError(err);
                }
            }

            throw err;
        }
    }

    ngOnDestroy(): void {
        this.groupSuggestionRatingSubscription.unsubscribe();
    }

}
