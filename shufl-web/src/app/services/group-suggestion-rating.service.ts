import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { GroupPlaylistRatingDownloadModel } from "../models/download-models/group-playlist-rating.model";
import { GroupAlbumRatingDownloadModel } from "../models/download-models/group-album-rating.model";

@Injectable()
export class GroupSuggestionRatingService {
    private rating: Subject<any> = new Subject<any>();

    public getRatingSubject(): Subject<any> {
        return this.rating;
    }

    public sendAlbumRating(groupAlbumRatingDownloadModel: GroupAlbumRatingDownloadModel, isDelete: boolean): void {
        this.rating.next({
            data: groupAlbumRatingDownloadModel,
            isDelete
        });
    }

    public sendPlaylistRating(groupPlaylistRatingDownloadModel: GroupPlaylistRatingDownloadModel, isDelete: boolean): void {
        this.rating.next({
            data: groupPlaylistRatingDownloadModel,
            isDelete
        });
    }
}