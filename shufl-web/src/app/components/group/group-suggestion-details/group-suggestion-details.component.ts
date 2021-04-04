import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
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

@Component({
    selector: 'app-group-suggestion-details',
    templateUrl: './group-suggestion-details.component.html',
    styleUrls: [
        './group-suggestion-details.component.scss',
        '../../../../assets/scss/music-details.scss'
    ]
})
export class GroupSuggestionDetailsComponent implements OnInit {
    @ViewChild(GroupSuggestionUserRatingListComponent)
    private groupSuggestionUserRatingListComponent!: GroupSuggestionUserRatingListComponent;
    @ViewChild(GroupSuggestionRatingComponent)
    private groupSuggestionRatingComponent!: GroupSuggestionRatingComponent;

    isLoading: boolean = true;

    album!: AlbumDownloadModel;
    
    overallRating!: RatingDownloadModel;

    genres: string[] = [
        "alt-rock",
        "indie-rock"
    ];

    groupSuggestion!: GroupSuggestionDownloadModel;

    groupId!: string;
    groupSuggestionId!: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private dialog: MatDialog,
                private dataService: DataService,
                private urlHelperService: UrlHelperService) { }

    ngOnInit(): void {
        var routeParams = this.route.snapshot.params;

        if (this.urlHelperService.isRouteParamObjectValid(routeParams) && 
            this.urlHelperService.isRouteParamValid(routeParams.groupId)) {
            this.groupId = routeParams.groupId;

            if (this.urlHelperService.isRouteParamValid(routeParams.groupSuggestionId)) {
                this.groupSuggestionId = routeParams.groupSuggestionId;

                this.getGroupSuggestionAsync(this.groupId, this.groupSuggestionId);
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
            this.overallRating = this.calculateOverallRating(this.groupSuggestion.groupSuggestionRatings);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            this.isLoading = false;
        }
    }
    
    private calculateOverallRating(ratings: GroupSuggestionRatingDownloadModel[]): RatingDownloadModel {
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

            var compositionRatings = this.groupSuggestion.groupSuggestionRatings.filter((gsr) => gsr.compositionRating != null)?.map((gsr) => gsr.compositionRating as number);
            var compositionTotal = compositionRatings.length > 0 ? compositionRatings.reduce((sum, current) => sum + current) : null;
            var compositionRating = compositionTotal != null ? this.averageAndRoundToDecimal(compositionTotal, compositionRatings?.length) : null;

            let rating = new RatingDownloadModel(
                "",
                overAllRating,
                lyricsRating,
                vocalsRating,
                instrumentalsRating,
                compositionRating,
                "",
                "",
                ""
            );

            rating.overallRatingsCount = overallRatings.length;
            rating.lyricsRatingsCount = lyricsRatings.length;
            rating.vocalsRatingsCount = vocalsRatings.length;
            rating.instrumentalsRatingsCount = instrumentalsRatings.length;
            rating.compositionRatingsCount = compositionRatings.length;

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
                ""
            );

            rating.overallRatingsCount = 0;
            rating.lyricsRatingsCount = 0;
            rating.vocalsRatingsCount = 0;
            rating.instrumentalsRatingsCount = 0;
            rating.compositionRatingsCount = 0;

            return rating;
        }
    }

    private averageAndRoundToDecimal(total: number, count: number) {
        return Math.round((total / count) * 10) / 10;
    }

    public rateButtonClicked(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';
        dialogConfig.maxWidth = "800px";
        dialogConfig.height = 'fit-content';
        dialogConfig.closeOnNavigation = true;

        let instance = this.dialog.open(GroupSuggestionRateComponent, dialogConfig);
        instance.componentInstance.groupId = this.groupId;
        instance.componentInstance.groupSuggestionId = this.groupSuggestionId;

        instance.afterClosed().subscribe((data) => {
            var groupSuggestionRating = data.data;
            
            if (groupSuggestionRating != null && groupSuggestionRating instanceof GroupSuggestionRatingDownloadModel) {
                this.groupSuggestion.groupSuggestionRatings.push(groupSuggestionRating);

                this.groupSuggestionUserRatingListComponent.addNewRating(groupSuggestionRating);
                this.groupSuggestionRatingComponent.updateRating(this.calculateOverallRating(this.groupSuggestion.groupSuggestionRatings));
            }
        });
    }

}
