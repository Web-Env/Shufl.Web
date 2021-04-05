import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { GroupSuggestionRatingDownloadModel } from "../models/download-models/group-suggestion-rating.model";

@Injectable()
export class GroupSuggestionRatingService {
    private rating: Subject<any> = new Subject<any>();

    public getRatingSubject(): Subject<any> {
        return this.rating;
    }

    public sendRating(groupSuggestionRatingDownloadModel: GroupSuggestionRatingDownloadModel, isDelete: boolean): void {
        this.rating.next({
            data: groupSuggestionRatingDownloadModel,
            isDelete
        });
    }
}