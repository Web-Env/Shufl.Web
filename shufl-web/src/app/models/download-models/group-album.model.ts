import { AlbumDownloadModel } from "./album.model";
import { GroupAlbumRatingDownloadModel } from "./group-album-rating.model";
import { UserDownloadModel } from "./user.model";

export class GroupAlbumDownloadModel {
    id!: string;
    identifier!: string;
    isRandom!: boolean;
    album!: AlbumDownloadModel;
    groupAlbumRatings!: Array<GroupAlbumRatingDownloadModel>;
    relatedGroupAlbum!: GroupAlbumDownloadModel;
    createdBy!: UserDownloadModel;
    createdOn!: string;

    constructor() {}
}