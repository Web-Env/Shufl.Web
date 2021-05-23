import { Component, Input, OnInit } from '@angular/core';
import { GroupAlbumRatingDownloadModel } from "src/app/models/download-models/group-album-rating.model";

@Component({
    selector: 'app-group-album-user-rating-list',
    templateUrl: './group-album-user-rating-list.component.html',
    styleUrls: ['./group-album-user-rating-list.component.scss']
})
export class GroupAlbumUserRatingListComponent implements OnInit {
    ratingsLeft: GroupAlbumRatingDownloadModel[] = [];
    ratingsRight: GroupAlbumRatingDownloadModel[] = [];

    @Input() groupAlbumRatings!: GroupAlbumRatingDownloadModel[];

    constructor() { }

    ngOnInit(): void {
        this.splitRatings(this.groupAlbumRatings);
    }

    private splitRatings(ratings: GroupAlbumRatingDownloadModel[]): void {
        let userAgent = navigator.userAgent;
        
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent)) {
            this.ratingsLeft = ratings.splice(0, ratings.length / 2);
            this.ratingsRight = ratings;
        }
        else {
            for (let i=0; i < ratings.length; i+=2) {
                this.ratingsLeft.push(ratings[i]);
                ratings[i + 1] != null && this.ratingsRight.push(ratings[i + 1]);
            }
        }
    }

    public addNewRating(rating: GroupAlbumRatingDownloadModel): void {
        if (this.ratingsLeft.length < this.ratingsRight.length) {
            this.ratingsLeft.push(rating);
        }
        else if (this.ratingsRight.length < this.ratingsLeft.length) {
            this.ratingsRight.push(rating);
        }
        else {
            this.ratingsLeft.push(rating);
        }
    }

    public updateRating(rating: GroupAlbumRatingDownloadModel): void {
        var ratingsLeftRatingIndex = this.ratingsLeft.map((gar) => gar.id).indexOf(rating.id);

        if (ratingsLeftRatingIndex > -1) {
            this.ratingsLeft[ratingsLeftRatingIndex] = rating;
        }
        else {
            var ratingsRightRatingIndex = this.ratingsRight.map((gar) => gar.id).indexOf(rating.id);

            this.ratingsRight[ratingsRightRatingIndex] = rating;
        }
    }

    public removeRating(ratingId: string) {
        var ratingsLeftRatingIndex = this.ratingsLeft.map((gar) => gar.id).indexOf(ratingId);

        if (ratingsLeftRatingIndex > -1) {
            this.ratingsLeft.splice(ratingsLeftRatingIndex, 1);
        }
        else {
            var ratingsRightRatingIndex = this.ratingsRight.map((gar) => gar.id).indexOf(ratingId);

            this.ratingsRight.splice(ratingsRightRatingIndex, 1);
        }

        var balanceOffset = this.ratingsLeft.length - this.ratingsRight.length;

        if (balanceOffset === 2) {
            this.ratingsRight.push(this.ratingsLeft[this.ratingsLeft.length - 1]);
            this.ratingsLeft.splice(this.ratingsLeft.length - 1, 1);
        }
        else if (balanceOffset === -2) {
            this.ratingsLeft.push(this.ratingsRight[this.ratingsRight.length - 1]);
            this.ratingsRight.splice(this.ratingsRight.length - 1, 1);
        }
    }
}
