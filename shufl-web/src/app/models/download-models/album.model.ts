import { ArtistDownloadModel } from './artist.model';
import { ImageDownloadModel } from "./image.model";
import { TrackDownloadModel } from './track.model';

export class AlbumDownloadModel {
    id!: string;
    name!: string;
    url!: string;
    releaseDate!: string;
    albumImages!: Array<ImageDownloadModel>;
    artists!: Array<ArtistDownloadModel>;
    tracks!: Array<TrackDownloadModel>;
}