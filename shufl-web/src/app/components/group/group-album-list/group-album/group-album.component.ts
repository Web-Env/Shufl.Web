import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RatingDownloadModel } from "src/app/models/download-models/rating.model";
import { GroupAlbumDownloadModel } from "src/app/models/download-models/group-album.model";

@Component({
    selector: '[app-group-album]',
    templateUrl: './group-album.component.html',
    styleUrls: ['./group-album.component.scss']
})
export class GroupAlbumComponent implements OnInit {
    @Input() groupAlbum!: GroupAlbumDownloadModel;

    overallRatingCalculated: boolean = false;
    overallRating!: RatingDownloadModel;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        if (this.groupAlbum != null) {
            this.calculateOverallRating();
        }
    }

    private calculateOverallRating(): void {
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
                "",
                ""
            );

            rating.overallRatingsCount = 0;
            rating.lyricsRatingsCount = 0;
            rating.vocalsRatingsCount = 0;
            rating.instrumentalsRatingsCount = 0;
            rating.structureRatingsCount = 0;

            this.overallRating = rating;
            this.overallRatingCalculated = true;
        }
    }

    private averageAndRoundToDecimal(total: number, count: number) {
        return Math.round((total / count) * 10) / 10;
    }

    public groupAlbumClicked(): void {
        this.router.navigate([`./a/${this.groupAlbum.identifier}`],
            { relativeTo: this.activatedRoute });
    }

}
