import { ImageDownloadModel } from "./image.model";

export class PlaylistDownloadModel {
    id!: string;
    name!: string;
    url!: string;
    releaseDate!: string;
    playlistImages!: Array<ImageDownloadModel>;
}