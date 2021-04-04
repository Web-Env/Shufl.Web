import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RatingDownloadModel } from "src/app/models/download-models/rating.model";
import { GroupSuggestionDownloadModel } from "src/app/models/download-models/group-suggestion.model";

@Component({
    selector: '[app-group-suggestion]',
    templateUrl: './group-suggestion.component.html',
    styleUrls: ['./group-suggestion.component.scss']
})
export class GroupSuggestionComponent implements OnInit {
    @Input() groupSuggestion!: GroupSuggestionDownloadModel;

    overallRatingCalculated: boolean = false;
    overallRating!: RatingDownloadModel;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        if (this.groupSuggestion != null) {
            this.calculateOverallRating();
        }
    }

    private calculateOverallRating(): void {
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

            this.overallRating = rating;
            this.overallRatingCalculated = true;
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

            this.overallRating = rating;
            this.overallRatingCalculated = true;
        }
    }

    private averageAndRoundToDecimal(total: number, count: number) {
        return Math.round((total / count) * 10) / 10;
    }

    public groupSuggestionClicked(): void {
        this.router.navigate([`./${this.groupSuggestion.identifier}`],
            { relativeTo: this.activatedRoute });
    }

}
