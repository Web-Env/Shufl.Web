import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";

import { AlbumDownloadModel } from "src/app/models/download-models/album.model";
import { GroupAlbumRatingDownloadModel } from "src/app/models/download-models/group-album-rating.model";
import { RatingDownloadModel } from "src/app/models/download-models/rating.model";
import { GroupAlbumDownloadModel } from "src/app/models/download-models/group-album.model";
import { DataService } from "src/app/services/data.service";
import { UrlHelperService } from "src/app/services/helpers/url-helper.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { GroupAlbumRateComponent } from "../../shared/group/dialogs/group-album-rate/group-album-rate.component";
import { GroupAlbumUserRatingListComponent } from "./group-album-user-rating-list/group-album-user-rating-list.component";
import { GroupAlbumRatingComponent } from "../../shared/group/group-album-rating/group-album-rating.component";
import { GroupSuggestionRatingService } from "src/app/services/group-suggestion-rating.service";
import { YesNoDialogComponent } from "../../shared/dialogs/yes-no-dialog/yes-no-dialog.component";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-group-album-details',
    templateUrl: './group-album-details.component.html',
    styleUrls: [
        './group-album-details.component.scss',
        '../../../../assets/scss/music-details.scss'
    ]
})
export class GroupAlbumDetailsComponent implements OnInit, OnDestroy {
    @ViewChild(GroupAlbumUserRatingListComponent)
    private groupAlbumUserRatingListComponent!: GroupAlbumUserRatingListComponent;
    @ViewChild(GroupAlbumRatingComponent)
    private groupAlbumRatingComponent!: GroupAlbumRatingComponent;

    isLoading: boolean = true;

    album!: AlbumDownloadModel;

    spotifyUsername!: string | null;
    
    overallRating!: RatingDownloadModel;

    genres!: string[];

    groupAlbum!: GroupAlbumDownloadModel;

    groupId!: string;
    groupAlbumId!: string;

    userHasRatedAlbum: boolean = false;

    groupAlbumRatingSubscription!: Subscription;

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

            if (this.urlHelperService.isRouteParamValid(routeParams.groupAlbumId)) {
                this.groupAlbumId = routeParams.groupAlbumId;

                this.getGroupAlbumAsync(this.groupId, this.groupAlbumId);
                this.groupAlbumRatingSubscription = this.groupSuggestionRatingService.getRatingSubject().subscribe((data) => {
                    if (data != null) {
                        if (data.data != null && data.data instanceof GroupAlbumRatingDownloadModel) {
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

    private async getGroupAlbumAsync(groupIdentifier: string, groupAlbumIdentifier: string): Promise<void> {
        try {
            this.groupAlbum = await this.dataService.getAsync<GroupAlbumDownloadModel>(
                `GroupAlbum/Get?groupIdentifier=${groupIdentifier}&groupAlbumIdentifier=${groupAlbumIdentifier}`, GroupAlbumDownloadModel);

            this.groupAlbum.groupAlbumRatings = this.dataService.mapJsonArrayToObjectArray<GroupAlbumRatingDownloadModel>(
                this.groupAlbum.groupAlbumRatings, GroupAlbumRatingDownloadModel
            );

            this.album = this.groupAlbum.album;
            this.overallRating = this.calculateOverallRating();

            var username = localStorage.getItem('Username');
            this.userHasRatedAlbum = this.groupAlbum.groupAlbumRatings.find((gar) => gar.createdBy.username === username) != null;
        }
        catch (err) {
            throw err;
        }
        finally {
            this.isLoading = false;
        }
    }
    
    private calculateOverallRating(): RatingDownloadModel {
        if (this.groupAlbum.groupAlbumRatings != null && this.groupAlbum.groupAlbumRatings.length !== 0) {
            var overallRatings = this.groupAlbum.groupAlbumRatings.map((gar) => gar.overallRating);
            var overallTotal = overallRatings.reduce((sum, current) => sum + current);
            var overAllRating = this.averageAndRoundToDecimal(overallTotal, overallRatings.length);

            var lyricsRatings = this.groupAlbum.groupAlbumRatings.filter((gar) => gar.lyricsRating != null)?.map((gar) => gar.lyricsRating as number);
            var lyricsTotal = lyricsRatings.length > 0 ? lyricsRatings.reduce((sum, current) => sum + current) : null;
            var lyricsRating = lyricsTotal != null ? this.averageAndRoundToDecimal(lyricsTotal, lyricsRatings.length) : null;

            var vocalsRatings = this.groupAlbum.groupAlbumRatings.filter((gar) => gar.vocalsRating != null)?.map((gar) => gar.vocalsRating as number);
            var vocalsTotal = vocalsRatings.length > 0 ? vocalsRatings.reduce((sum, current) => sum + current) : null;
            var vocalsRating = vocalsTotal != null ? this.averageAndRoundToDecimal(vocalsTotal, vocalsRatings.length) : null;

            var instrumentalsRatings = this.groupAlbum.groupAlbumRatings.filter((gar) => gar.instrumentalsRating != null)?.map((gar) => gar.instrumentalsRating as number);
            var instrumentalsTotal = instrumentalsRatings.length > 0 ? instrumentalsRatings.reduce((sum, current) => sum + current) : null;
            var instrumentalsRating = instrumentalsTotal != null ? this.averageAndRoundToDecimal(instrumentalsTotal, instrumentalsRatings?.length) : null;

            var structureRatings = this.groupAlbum.groupAlbumRatings.filter((gar) => gar.structureRating != null)?.map((gar) => gar.structureRating as number);
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

    public addOrUpdateRating(existingGroupAlbumRating: GroupAlbumRatingDownloadModel | null): void {
        if (!this.dialogOpen) {
            const dialogConfig = new MatDialogConfig();

            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '90%';
            dialogConfig.maxWidth = "800px";
            dialogConfig.height = 'fit-content';
            dialogConfig.closeOnNavigation = true;
    
            let instance = this.dialog.open(GroupAlbumRateComponent, dialogConfig);
            this.dialogOpen = true;
    
            if (existingGroupAlbumRating == null) {
                instance.componentInstance.groupId = this.groupId;
                instance.componentInstance.groupAlbumId = this.groupAlbumId;
            }
            else {
                instance.componentInstance.groupAlbumRating = existingGroupAlbumRating;
            }
    
            instance.afterClosed().subscribe((data) => {
                if (data != null) {
                    var groupAlbumRating = data.data;
                
                    if (groupAlbumRating != null && groupAlbumRating instanceof GroupAlbumRatingDownloadModel) {
                        if (existingGroupAlbumRating == null) {
                            this.groupAlbum.groupAlbumRatings.push(groupAlbumRating);
    
                            this.groupAlbumUserRatingListComponent.addNewRating(groupAlbumRating);
                            this.groupAlbumRatingComponent.updateRating(this.calculateOverallRating());
    
                            this.userHasRatedAlbum = true;
                        }
                        else {
                            var existingIndex = this.groupAlbum.groupAlbumRatings.map((gar) => gar.id).indexOf(groupAlbumRating.id);
    
                            this.groupAlbum.groupAlbumRatings[existingIndex] = groupAlbumRating;
                            this.groupAlbumUserRatingListComponent.updateRating(groupAlbumRating);
    
                            this.groupAlbumRatingComponent.updateRating(this.calculateOverallRating());
                        }
                    }
                }

                this.dialogOpen = false;
            });
        }
    }

    public deleteRating(groupAlbumRating: GroupAlbumRatingDownloadModel): void {
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
                        await this.removeRatingAsync(groupAlbumRating.id);

                        var existingIndex = this.groupAlbum.groupAlbumRatings.map((gar) => gar.id).indexOf(groupAlbumRating.id);

                        this.groupAlbum.groupAlbumRatings.splice(existingIndex, 1);
                        this.groupAlbumUserRatingListComponent.removeRating(groupAlbumRating.id);

                        this.groupAlbumRatingComponent.updateRating(this.calculateOverallRating());
                        this.userHasRatedAlbum = false;
                    }
                }

                this.dialogOpen = false;
            });
        }
    }

    public async removeRatingAsync(groupAlbumRatingId: string): Promise<void> {
        await this.dataService.deleteAsync(`GroupAlbumRating/Delete?groupAlbumRatingId=${groupAlbumRatingId}`);
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
        this.groupAlbumRatingSubscription.unsubscribe();
    }

}
