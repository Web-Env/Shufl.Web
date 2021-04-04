import { ArtistDownloadModel } from './artist.model';

export class TrackDownloadModel {
    id!: string;
    trackNumber!: number;
    name!: string;
    artists!: Array<ArtistDownloadModel>;
    duration!: number;
}