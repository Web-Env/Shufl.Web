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
            var ratingsCount = this.groupSuggestion.groupSuggestionRatings.length;

            var overallTotal = this.groupSuggestion.groupSuggestionRatings.map(gsr => gsr.overallRating).reduce((sum, current) => sum + current);
            var lyricsTotal = this.groupSuggestion.groupSuggestionRatings.map(gsr => gsr.lyricsRating).reduce((sum, current) => sum + current);
            var vocalsTotal = this.groupSuggestion.groupSuggestionRatings.map(gsr => gsr.vocalsRating).reduce((sum, current) => sum + current);
            var instrumentalsTotal = this.groupSuggestion.groupSuggestionRatings.map(gsr => gsr.instrumentalsRating).reduce((sum, current) => sum + current);
            var compositionTotal = this.groupSuggestion.groupSuggestionRatings.map(gsr => gsr.compositionRating).reduce((sum, current) => sum + current);

            this.overallRating = new Rating(
                "",
                overallTotal / ratingsCount,
                lyricsTotal / ratingsCount,
                vocalsTotal / ratingsCount,
                instrumentalsTotal / ratingsCount,
                compositionTotal / ratingsCount,
                "",
                "",
                ""
            );

            this.overallRatingCalculated = true;
        }
        else {
            this.overallRating = new Rating(
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

            this.overallRatingCalculated = true;
        }
    }

    public groupSuggestionClicked(): void {
        this.router.navigate([`./${this.groupSuggestion.identifier}`],
            { relativeTo: this.activatedRoute });
    }

}
