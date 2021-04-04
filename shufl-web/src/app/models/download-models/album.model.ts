import { ArtistDownloadModel } from './artist.model';
import { TrackDownloadModel } from './track.model';

export class AlbumDownloadModel {
    id!: string;
    name!: string;
    url!: string;
    releaseDate!: string;
    albumImages!: Array<any>;
    artists!: Array<ArtistDownloadModel>;
    tracks!: Array<TrackDownloadModel>;
}