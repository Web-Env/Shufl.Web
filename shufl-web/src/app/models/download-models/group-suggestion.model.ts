import { AlbumDownloadModel } from "./album.model";
import { GroupSuggestionRatingDownloadModel } from "./group-suggestion-rating.model";
import { UserDownloadModel } from "./user.model";

export class GroupSuggestionDownloadModel {
    identifier!: string;
    isRandom!: boolean;
    album!: AlbumDownloadModel;
    groupSuggestionRatings!: Array<GroupSuggestionRatingDownloadModel>;
    createdBy!: UserDownloadModel;
    createdOn!: string;

    constructor() {}
}