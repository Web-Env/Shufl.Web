import { ImageDownloadModel } from "./image.model";

export class UserDownloadModel {
    username!: string;
    displayName!: string;
    firstName!: string;
    lastName!: string;
    spotifyUsername!: string;
    spotifyMarket!: string;
    userImages!: Array<ImageDownloadModel>;
}