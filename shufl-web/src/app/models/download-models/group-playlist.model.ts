import { GroupPlaylistRatingDownloadModel } from "./group-playlist-rating.model";
import { PlaylistDownloadModel } from "./playlist.model";
import { UserDownloadModel } from "./user.model";

export class GroupPlaylistDownloadModel {
    identifier!: string;
    isRandom!: boolean;
    playlist!: PlaylistDownloadModel;
    groupPlaylistRatings!: Array<GroupPlaylistRatingDownloadModel>;
    createdBy!: UserDownloadModel;
    createdOn!: string;

    constructor() {}
}