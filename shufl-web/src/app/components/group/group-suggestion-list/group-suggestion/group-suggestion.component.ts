import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Rating } from "src/app/models/download-models/rating.model";
import { GroupSuggestion } from "src/app/models/download-models/group-suggestion.model";

@Component({
    selector: '[app-group-suggestion]',
    templateUrl: './group-suggestion.component.html',
    styleUrls: ['./group-suggestion.component.scss']
})
export class GroupSuggestionComponent implements OnInit {
    @Input() groupSuggestion!: GroupSuggestion;

    overallRatingCalculated: boolean = false;
    overallRating!: Rating;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        if (this.groupSuggestion != null) {
            this.calculateOverallRating();
        }
    }

    private calculateOverallRating(): void {
        if (this.groupSuggestion.groupSuggestionRatings != null && this.groupSuggestion.groupSuggestionRatings.length != 0) {
            var overallRatings = this.groupSuggestion.groupSuggestionRatings.map(gsr => gsr.overallRating);
            var overallTotal = overallRatings.reduce((sum, current) => sum + current);
            var overAllRating = this.averageAndRoundToDecimal(overallTotal, overallRatings.length);

            var lyricsRatings = this.groupSuggestion.groupSuggestionRatings.map(gsr => gsr.lyricsRating);
            var lyricsTotal = lyricsRatings.reduce((sum, current) => sum + current);
            var lyricsRating = this.averageAndRoundToDecimal(lyricsTotal, lyricsRatings.length);

            var vocalsRatings = this.groupSuggestion.groupSuggestionRatings.map(gsr => gsr.vocalsRating);
            var vocalsTotal = vocalsRatings.reduce((sum, current) => sum + current);
            var vocalsRating = this.averageAndRoundToDecimal(vocalsTotal, vocalsRatings.length);

            var instrumentalsRatings = this.groupSuggestion.groupSuggestionRatings.map(gsr => gsr.instrumentalsRating);
            var instrumentalsTotal = instrumentalsRatings.reduce((sum, current) => sum + current);
            var instrumentalsRating = this.averageAndRoundToDecimal(instrumentalsTotal, instrumentalsRatings.length);

            var compositionRatings = this.groupSuggestion.groupSuggestionRatings.map(gsr => gsr.compositionRating);
            var compositionTotal = compositionRatings.reduce((sum, current) => sum + current);
            var compositionRating = this.averageAndRoundToDecimal(compositionTotal, compositionRatings.length);

            let rating = new Rating(
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
            let rating = new Rating(
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
