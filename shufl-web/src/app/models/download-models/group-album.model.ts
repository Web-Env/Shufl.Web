import { AlbumDownloadModel } from "./album.model";
import { GroupAlbumRatingDownloadModel } from "./group-album-rating.model";
import { UserDownloadModel } from "./user.model";

export class GroupAlbumDownloadModel {
    identifier!: string;
    isRandom!: boolean;
    album!: AlbumDownloadModel;
    groupAlbumRatings!: Array<GroupAlbumRatingDownloadModel>;
    createdBy!: UserDownloadModel;
    createdOn!: string;

    constructor() {}
}