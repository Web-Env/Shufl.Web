import { Component, Input, OnInit } from '@angular/core';
import { GroupPlaylistRatingDownloadModel } from "src/app/models/download-models/group-playlist-rating.model";

@Component({
    selector: 'app-group-playlist-user-rating-list',
    templateUrl: './group-playlist-user-rating-list.component.html',
    styleUrls: ['./group-playlist-user-rating-list.component.scss']
})
export class GroupPlaylistUserRatingListComponent implements OnInit {
    ratingsLeft: GroupPlaylistRatingDownloadModel[] = [];
    ratingsRight: GroupPlaylistRatingDownloadModel[] = [];

    @Input() groupPlaylistRatings!: GroupPlaylistRatingDownloadModel[];

    constructor() { }

    ngOnInit(): void {
        this.splitRatings(this.groupPlaylistRatings);
    }

    private splitRatings(ratings: GroupPlaylistRatingDownloadModel[]): void {
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

}
